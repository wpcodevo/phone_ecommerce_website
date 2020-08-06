const express = require('express');
const cartController = require('./controllers/cart');

const router = express.Router();

router
  .route('/')
  .get(cartController.getAllCart)
  .post(cartController.createCart);

router
  .route('/:id')
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);
