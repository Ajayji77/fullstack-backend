const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  company: String,
  userId: String,
  model: String,
});

module.exports = mongoose.model("product", productSchema);
