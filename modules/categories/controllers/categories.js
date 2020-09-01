const Category = require('../models/categories');
const factory = require('../../utils/factory');
const catchAsync = require('../../utils/error/catchAsync');
// const appError = require('../../utils/error/appError');

function createCategoryList(categories, parentId = null) {
  const allCategories = [];
  let category;
  if (parentId === null) {
    category = categories.filter((cate) => cate.parentId === undefined);
  } else {
    category = categories.filter((cate) => cate.parentId === parentId);
  }

  category.forEach((cat) => {
    allCategories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategoryList(categories, cat._id),
    });
  });

  return allCategories;
}

exports.getAllCategory = catchAsync(async (req, res) => {
  const categories = await Category.find({});

  if (categories) {
    const categoryList = createCategoryList(categories);

    res.status(200).json({
      status: 'success',
      results: categoryList.length,
      data: {
        categoryList,
      },
    });
  }
});

exports.createCategory = factory.createOne(Category);
exports.getCategoryById = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
