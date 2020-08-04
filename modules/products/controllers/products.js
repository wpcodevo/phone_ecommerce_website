const Product = require('../models/products');
const APIFeatures = require('../../utils/apiFeatures');
const catchAsync = require('../../utils/error/catchAsync');
const AppError = require('../../utils/error/appError');

exports.aliasTop10Products = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price,ratingsAverage,description';
  next();
};

exports.getAllProducts = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.categoryId) filter = { product: req.params.categoryId };
  const features = new APIFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new AppError('No product found with such ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) {
    return next(new AppError('No product found with such ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
