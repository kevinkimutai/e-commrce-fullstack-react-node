const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: { type: String, required: [true, "description is required"] },
  imgUrl: [String],
  totalSales: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
