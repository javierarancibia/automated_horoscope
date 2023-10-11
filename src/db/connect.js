const mongoose = require("mongoose");

const connectDB = async url => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB