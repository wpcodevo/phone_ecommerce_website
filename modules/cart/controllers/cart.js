const mongoose = require('mongoose');
const catchAsync = require('../../utils/error/catchAsync');
const Cart = require('../models/cart');
const AppError = require('../../utils/error/appError');

exports.createCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await Cart.findOne({ user: req.body.user });
  if (cartItem) {
    const item = cartItem.cart.find((el) => el.product === req.body.product);

    let where;
    let action;
    let set;
    if (item) {
      action = '$set';
      where = { user: req.body.user, 'cart.product': req.body.product };
      set = 'cart.$';
    } else {
      action = '$push';
      where = { user: req.body.user };
      set = 'cart';
    }

    const newItem = await Cart.findOneAndUpdate(where, {
      [action]: {
        [set]: {
          _id: item ? item._id : new mongoose.Types.ObjectId(),
          product: req.body.product,
          quantity: item
            ? item.quantity + req.body.quantity
            : req.body.quantity,
          price: req.body.price,
          total: item
            ? req.body.price * (req.body.quantity + item.quantity)
            : req.body.price * req.body.quantity,
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        data: newItem,
      },
    });
  } else {
    const newItem = await Cart.create({
      user: req.body.user,
      cart: [
        {
          product: req.body.product,
          price: req.body.price,
          quantity: req.body.quantity,
          total: req.body.price * req.body.quantity,
        },
      ],
    });

    res.status(201).json({
      status: 'success',
      data: {
        cart: newItem,
      },
    });
  }
});

exports.getAllCartItems = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.find({ user: req.params.userId })
    .populate({
      path: 'product',
      select: 'name imageCover',
    })
    .select('_id user cart');

  if (!cartItems) {
    next(new AppError('No user with this Id', 404));
  }

  res.status(200).json({
    status: 'success',
    results: cartItems.length,
    data: {
      cartItems,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { user, product, quantity, total } = req.body;
  const newItem = await Cart.update(
    { user, 'cart.product': product },
    {
      $set: {
        'cart.$.quantity': quantity,
        'cart.$.total': total,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      cart: newItem,
    },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {});
