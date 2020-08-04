const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      //   required: [true, 'Review must not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    user: [
      {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user'],
      },
    ],
    product: [
      {
        type: ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product'],
      },
    ],
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
