const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  products: [{ type: Object, required: [true, 'order must contain products'] }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalAmountPaid: { type: Number, required: [true, 'Missing amount'] },
  paymentStatus: {
    type: String,
    enum: ['paid', 'not paid'],
    default: 'paid',
    required: [true, 'missing payment status']
  },
  paymentId: { type: String, required: [true, 'missing payment id'] },
  orderStatus: {
    type: String,
    enum: ['processing', 'Being shipped', 'delivered']
  },
  city: { type: String, required: [true, 'Must contain city'] },
  address: {
    type: String,
    required: [true, 'must contain a shipment Address']
  },
  town: { type: String, required: [true, 'must contain a shipment town'] },
  addressDescription: {
    type: String,
    required: [true, 'must contain a description of the location']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
