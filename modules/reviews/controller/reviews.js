const Review = require('../models/reviews');
const catchAsync = require('../../utils/error/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.params.userId;

  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
