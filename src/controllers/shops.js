const shopModel = require("../models/shops");

const getShops = async (_req, res) => {
  const shops = await shopModel.find({}).populate({
    path: "orders",
    populate: {
      path: "products",
    },
  });
  res.send({ data: shops });
};

const getShop = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await shopModel.findById({ _id: id });
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

const createShop = async (req, res) => {
  try {
    const { name, description, address, orders } = req.body;
    const responseShop = await shopModel.create({
      name,
      description,
      address,
      orders,
    });
    res.send({ data: responseShop });
  } catch (error) {
    res.json({ error });
  }
};

const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, orders } = req.body;
    const response = await shopModel.findByIdAndUpdate(
      { _id: id },
      { name, description, address, orders }
    );
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: { _id: id, name, description, address } });
  } catch (error) {
    res.json(error);
  }
};

const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await shopModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getShops, getShop, createShop, updateShop, deleteShop };
