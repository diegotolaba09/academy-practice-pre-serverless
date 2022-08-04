import shopModel from "../schemas/shops.js";

const getShops = async (_req, res, next) => {
  try {
    const shops = await shopModel
      .find({})
      .populate({ path: "user" })
      .populate({
        path: "orders",
        populate: {
          path: "products",
        },
      });

    res.send({ data: shops });
  } catch (err) {
    next(err);
  }
};

const getShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await shopModel.findById({ _id: id });
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const createShop = async (req, res, next) => {
  try {
    const { name, description, address, user, orders } = req.body;
    const responseShop = await shopModel.create({
      name,
      description,
      address,
      user,
      orders,
    });
    res.send({ data: responseShop });
  } catch (err) {
    next(err);
  }
};

const updateShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, address, user, orders } = req.body;
    const response = await shopModel.findByIdAndUpdate(
      { _id: id },
      { name, description, address, user, orders }
    );
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: { _id: id, name, description, address } });
  } catch (err) {
    next(err);
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await shopModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getShops, getShop, createShop, updateShop, deleteShop };
