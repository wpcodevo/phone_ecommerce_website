const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    cart: [
      {
        product: { type: ObjectId, ref: 'Product' },
        price: { type: Number, required: [true, 'Please enter the price'] },
        quantity: { type: Number, default: 1 },
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
