const shopModel = require("../models/shops");

const getShops = async (_req, res) => {
  const shops = await shopModel.find({});
  res.send({ data: shops });
};

const getShop = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await shopModel.findById({ _id: id });
    console.log(response);
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
    const { name, description, country } = req.body;
    const responseShop = await shopModel.create({
      name,
      description,
      country,
    });
    res.send({ data: responseShop });
  } catch (error) {
    console.log(error);
  }
};

const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, country } = req.body;
    const response = await shopModel.findByIdAndUpdate(
      { _id: id },
      { name, description, country }
    );
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: { _id: id, name, description, country } });
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
