const Category = require('../models/categories');
const factory = require('../../utils/factory');

// const categoryTree = (parentId = '', docs) => {
//   const category = docs.filter((doc) => parentId === doc.parent);
//   const allCategories = [];
//   category.forEach((cat) => {
//     allCategories.push({
//       _id: cat._id,
//       name: cat.name,
//       slug: cat.slug,
//       children: categoryTree(cat._id, docs),
//     });
//   });

//   return allCategories;
// };

// exports.getAllCategory = catchAsync(async (req, res) => {
//   const categories = await Category.find();
//   // const newCategories = categoryTree('', categories);

//   res.status(200).json({
//     status: 'success',
//     results: categories.length,
//     data: {
//       categories,
//     },
//   });
// });

exports.createCategory = factory.createOne(Category);
exports.getAllCategory = factory.getAll(Category);
exports.getCategoryById = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
