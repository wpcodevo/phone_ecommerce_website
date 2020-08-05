const catchAsync = require('./error/catchAsync');
const AppError = require('./error/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with such ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
