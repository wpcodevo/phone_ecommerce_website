const express = require('express');
const cartController = require('./controllers/cart');

const router = express.Router();

router
  .route('/')
  .get(cartController.getAllCartItems)
  .post(cartController.createCartItem);

router.route('/:userId').patch(cartController.updateCartItem);

module.exports = router;
