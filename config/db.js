const mongoose = require('mongoose');

const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Database connected successfully on ${con.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
