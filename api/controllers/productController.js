const Product = require('../models/product');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

//ALIAS TOP PRODUCTS
exports.getTopProducts = (req, res, next) => {
  req.query.limit = '4';
  req.query.sort = '-price,-createdAt';

  next();
};

//GET ALL PRODUCTS
exports.getAllProducts = catchAsync(async (req, res) => {
  //1. Filtering
  const queryObj = { ...req.query };
  const queryParams = ['sort', 'limit', 'page', 'fields'];
  queryParams.forEach(element => delete queryObj[element]);

  //2. Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  //3.Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-created_at');
  }

  //4.Limiting Fields
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  //5.Pagination

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 100;

  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  //////QUERY THE MODEL
  const data = await query;

  res.status(200).json({
    message: 'Success',
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

//GET ONE PRODUCT
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No such product found', 404));
  }

  res.status(200).json({
    message: 'success',
    data: product
  });
});
