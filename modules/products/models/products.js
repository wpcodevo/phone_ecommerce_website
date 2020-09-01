const mongoose = require('mongoose');
const slugify = require('slugify');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [
        320,
        'A product name must be less or equal to 120 characters',
      ],
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
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
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
      required: [true, 'A product category must not be empty'],
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });

// Virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
