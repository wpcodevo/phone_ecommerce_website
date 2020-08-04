const express = require('express');
const productController = require('./controllers/products');
const authController = require('../auth/controller/auth');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:productId')
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
