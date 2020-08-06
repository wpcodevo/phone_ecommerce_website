const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userAddressSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  address: [
    {
      firstName: {
        type: String,
        required: [true, 'Please provide your name'],
      },
      mobileNumber: {
        type: Number,
        required: [true, 'Please provide your valid Phone Number'],
      },
      pinCode: { type: String, required: true },
      locality: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      alternatePhoneNumber: Number,
    },
  ],
});

module.exports = mongoose.model('UserAddress', userAddressSchema);
