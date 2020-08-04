const express = require('express');
const categoryController = require('./controllers/categories');
const authController = require('../auth/controller/auth');
const productRouter = require('../products/routes');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCategory
  );

router.use('/:categoryId/products', productRouter);

router.get('/:categoryId', categoryController.getCategoryById);

router
  .route('/:categoryId')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
