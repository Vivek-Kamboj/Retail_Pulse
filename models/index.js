const mongoose = require("mongoose");

require("dotenv").config();
const dbUrl = process.env.MONGODB_URI;

mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(`MongoDB connection error : ${err}`));

module.exports = {
  Job: require("./job"),
};
