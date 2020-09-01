const mongoose = require('mongoose');
const cart = require('../../cart/models/cart');

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    order: [
      {
        product: { type: ObjectId, ref: 'Product' },
        amount: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    address: { type: ObjectId, ref: 'UserAddress' },
    paymentType: String,
    paymentStatus: {
      type: String,
      default: 'Not Paid',
      enum: ['Paid', 'Not Paid'],
    },
    orderStatus: {
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processed', 'Shipped', 'Delivered', 'Cancelled'],
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    isOrderCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
