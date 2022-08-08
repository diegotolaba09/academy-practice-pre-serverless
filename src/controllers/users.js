import { encrypt } from "../helpers/handleBcrypt.js";
import userModel from "../schemas/users.js";
import shopModel from "../schemas/shops.js";

const getUsers = async (_req, res, next) => {
  try {
    const users = await userModel.find({}).populate({
      path: "shop",
      populate: {
        path: "orders",
        populate: {
          path: "products",
        },
      },
    });
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userModel
      .findById({ _id: id })
      .populate({ path: "shop" });
    if (!response) {
      throw { message: "User not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      email,
      username,
      password,
      role,
      locations,
      paymentLimit,
      shop: shopId,
    } = req.body;

    const passwordHash = await encrypt(password);

    const dataByUser = {
      fullName,
      email,
      username,
      password: passwordHash,
      role,
      locations,
      paymentLimit,
    };

    const shop = await shopModel.findById(shopId);

    if (shop) {
      dataByUser.shop = shopId;
    }

    const user = await userModel.findByIdAndUpdate({ _id: id }, dataByUser);

    if (shop && shopId !== user.shop) {
      if (user.shop) {
        const oldShop = await shopModel.findById({ _id: user.shop });
        oldShop.users = oldShop.users.filter((data) => !data.equals(user._id));
        await oldShop.save();
      }
      shop.users.push(id);
      await shop.save();
    }

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    const response = await userModel.findByIdAndDelete(id);
    
    if (!response) {
      throw { message: "User not found", status: 404 };
    }

    const shop = await shopModel.findById(user.shop);

    if (shop) {
      shop.users = shop.users.filter((data) => !data.equals(user._id));
      await shop.save();
    }

    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getUsers, getUser, updateUser, deleteUser };
