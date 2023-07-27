const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: String,
  company: String,
  model: String,
});

module.exports = mongoose.model("product", productSchema);
