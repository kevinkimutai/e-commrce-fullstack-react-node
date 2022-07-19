const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  createNewProduct,
  getOneProduct,
  getTopProducts
} = require('../controllers/productController');

router.route('/top-new-products').get(getTopProducts, getAllProducts);

router
  .route('/')
  .get(getAllProducts)
  .post(createNewProduct);

router.route('/:id').get(getOneProduct);

module.exports = router;
