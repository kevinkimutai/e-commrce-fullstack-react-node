const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getOneProduct,
  postNewProduct,
  deleteOneProduct,
  updateProduct,
} = require("../controllers/productsController");

router.route("/").get(getAllProducts).post(postNewProduct);

router
  .route("/:id")
  .get(getOneProduct)
  .delete(deleteOneProduct)
  .patch(updateProduct);

module.exports = router;
