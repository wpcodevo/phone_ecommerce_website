const Product = require('../models/products');
// const APIFeatures = require('../../utils/apiFeatures');
// const catchAsync = require('../../utils/error/catchAsync');
// const AppError = require('../../utils/error/appError');
const factory = require('../../utils/factory');

exports.aliasTop10Products = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price,ratingsAverage,description';
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getProductById = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
