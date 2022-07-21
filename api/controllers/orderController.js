const Order = require('../models/order');
const catchAsync = require('../utils/catchAsync');

//CREATE NEW ORDER
exports.createOrder = catchAsync(async (req, res, next) => {
  const data = await Order.create(req.body);

  res.status(200).json({
    message: 'success',
    data
  });
});
