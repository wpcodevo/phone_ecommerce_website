const mongoose = require('mongoose');
const Product = require('../../products/models/products');

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    product: {
      type: ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (product) {
  const stats = await this.aggregate([
    {
      $match: { product },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Product.findByIdAndUpdate(product, {
    ratingsAverage: stats[0].avgRating,
    ratingsQuantity: stats[0].nRating,
  });
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
  // Review.calcAverageRatings(this.product)
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
