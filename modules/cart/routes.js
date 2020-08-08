const express = require('express');
const cartController = require('./controllers/cart');
const authController = require('../auth/controller/auth');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('user'));

router
  .route('/')
  .get(cartController.getAllCartItems)
  .post(cartController.createCartItem);

router.route('/:userId').patch(cartController.updateCartItem);

module.exports = router;
