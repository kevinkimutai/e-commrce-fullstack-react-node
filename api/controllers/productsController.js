const Product = require("../model/Product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.find();

    res.status(200).json({
      status: "success",
      length: data.length(),
      data,
    });
  } catch (error) {
    res.status(401).json({
      status: error,
    });
  }
};

exports.postNewProduct = (req, res, next) => {};

exports.getOneProduct = (req, res, next) => {};
exports.postNewProduct = (req, res, next) => {};
exports.deleteOneProduct = (req, res, next) => {};
exports.updateProduct = (req, res, next) => {};
