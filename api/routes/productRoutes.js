const express = require('express');

const router = express.Router;

const {
  getAllProducts,
  createNewProduct
} = require('../controllers/productController');

router
  .route('/')
  .get(getAllProducts)
  .post(createNewProduct);

module.exports = router;
