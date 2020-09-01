const mongoose = require('mongoose');
const slugify = require('slugify');

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
    parentId: String,
    slug: String,
  },
  { timestamps: true }
);

categoriesSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: '_id',
});

categoriesSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Categories', categoriesSchema);
