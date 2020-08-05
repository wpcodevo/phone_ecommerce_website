const express = require('express');
const productController = require('./controllers/products');
const authController = require('../auth/controller/auth');
const reviewRouter = require('../reviews/routes');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

router.use('/:productId/reviews', reviewRouter);

// router
//   .route('/:productId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
