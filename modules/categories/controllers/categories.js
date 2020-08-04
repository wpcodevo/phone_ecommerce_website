const Category = require('../models/categories');
const catchAsync = require('../../utils/error/catchAsync');
const AppError = require('../../utils/error/appError');

exports.createCategory = catchAsync(async (req, res) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      categories: newCategory,
    },
  });
});

exports.getAllCategory = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(new AppError('No category found with such ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndUpdate(
    req.params.categoryId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!category) {
    return next(new AppError('No category found with such ID', 404));
  }
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndRemove(req.params.categoryId);

  if (!category) {
    return next(new AppError('No category found with such ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
