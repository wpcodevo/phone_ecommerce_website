const mongoose = require('mongoose');
const slugify = require('slugify');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [40, 'A product name must be less or equal to 40 characters'],
      minlength: [10, 'A product name must be more or equal to 10 characters'],
      unique: true,
      required: [true, 'A product must have a name'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'A product description must be less or equal to 2000'],
      required: [true, 'A product must have description'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'A product must have a price'],
      maxlength: [
        32,
        'A product price must be less or equal to 32 characterss',
      ],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    priceDiscount: {
      type: String,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    slug: String,
    images: [String],
    imageCover: {
      type: String,
      required: [true, 'A product must have an image cover'],
    },
    shipping: {
      type: Boolean,
    },
    category: {
      type: ObjectId,
      ref: 'Categories',
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'categories',
    select: '-_v',
  });
  next();
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', productSchema);
