import productModel from "../schemas/products.js";

const getProducts = async (_req, res, next) => {
  try {
    const products = await productModel.find({});
    res.send({ data: products });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const responseProduct = await productModel.create({
      name,
      description,
      price,
    });
    res.send({ data: responseProduct });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Product not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getProducts, createProduct, deleteProduct };
