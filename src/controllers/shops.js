import shopModel from "../schemas/shops.js";
import userModel from "../schemas/users.js";
import { getUserAuth, isEditorNotAuthorized } from "./utils.js";

const getShops = async (_req, res, next) => {
  try {
    const shops = await shopModel
      .find({})
      .populate("users")
      .populate({
        path: "paymentIntents",
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
    const { role, userId } = getUserAuth(req);

    const shop = await shopModel.findById(id);

    if (!shop) {
      throw { message: "Shop not found", status: 404 };
    }

    if (isEditorNotAuthorized(role, shop, userId)) {
      throw {
        message: `You are not authorized, ${role} can only view his own user`,
        status: 401,
      };
    }

    res.send({ data: shop });
  } catch (err) {
    next(err);
  }
};

const createShop = async (req, res, next) => {
  try {
    const { name, description, address, users, paymentIntents } = req.body;
    const responseShop = await shopModel.create({
      name,
      description,
      address,
      users,
      paymentIntents,
    });
    res.send({ data: responseShop });
  } catch (err) {
    next(err);
  }
};

const updateShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, address, users, paymentIntents } = req.body;
    const { role, userId } = getUserAuth(req);

    const shop = await shopModel.findById(id);

    if (isEditorNotAuthorized(role, shop, userId)) {
      throw {
        message: `You are not authorized, ${role} can only change his own user`,
        status: 401,
      };
    }

    const response = await shopModel.findByIdAndUpdate(
      { _id: id },
      { name, description, address, users, paymentIntents }
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
    const { id: shopId } = req.params;
    const { role, userId } = getUserAuth(req);

    const shop = await shopModel.findById({ _id: shopId });

    if (isEditorNotAuthorized(role, shop, userId)) {
      throw {
        message: `You are not authorized, ${role} can only delete his own user`,
        status: 401,
      };
    }

    const response = await shopModel.findByIdAndDelete({ _id: shopId });

    if (!response) {
      throw { message: "Shop not found", status: 404 };
    }

    await userModel.findByIdAndUpdate({ _id: userId }, { shop: null });

    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getShops, getShop, createShop, updateShop, deleteShop };
