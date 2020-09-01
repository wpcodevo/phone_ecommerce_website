const Order = require('../models/orders');
const catchAsync = require('../../utils/error/catchAsync');
const UserAddress = require('../../users/models/userAddress');

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    user,
    address,
    paymentType,
    paymentStatus,
    orderStatus,
    order,
  } = req.body;
  const newOrder = await Order.create({
    user,
    address,
    paymentType,
    paymentStatus,
    orderStatus,
    order,
  });

  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const orders = await Order.find({ user });

  const userAddress = await UserAddress.findOne({ user });

  const orderWithAddress = orders.map((order) => {
    const address = userAddress.address.find((userAdd) =>
      order.address.equals(userAdd._id)
    );
    return {
      _id: order._id,
      order: order.order,
      address: address,
      paymentType: order.paymentType,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      orderDate: order.orderDate,
      isOrderCompleted: order.isOrderCompleted,
    };
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders: orderWithAddress,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const order = await Order.findById({ user });

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
