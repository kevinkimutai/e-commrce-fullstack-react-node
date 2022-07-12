const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name']
  },

  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A product must have a description']
  },
  quantity: {
    type: Number,
    required: [true, 'A product must have a quantity']
  },
  category: {
    type: String,
    required: [true, 'A product must have a category']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A product must have a summary']
  },
  images: {
    type: [String],
    required: [true, 'A product must have a cover image']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  totalSales: {
    type: Number
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
