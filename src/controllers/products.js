import productModel from "../models/products.js";

const getProducts = async (_req, res) => {
  const products = await productModel.find({});
  res.send({ data: products });
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const responseProduct = await productModel.create({
      name,
      description,
      price,
    });
    res.send({ data: responseProduct });
  } catch (error) {
    res.json({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Product not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

export { getProducts, createProduct, deleteProduct };
