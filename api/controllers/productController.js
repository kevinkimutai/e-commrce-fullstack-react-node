const Product = require('../models/product');

const catchAsync = require('../utils/catchAsync');

//GET ALL PRODUCTS
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const data = await Product.find();

  res.status(200).json.send({
    status: 'success',
    items: data.length,
    data
  });
});

//CREATE A NEW PRODUCT
exports.createNewProduct = catchAsync(async (req, res, next) => {
  const data = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data
  });
});
