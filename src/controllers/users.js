import { encrypt } from "../helpers/handleBcrypt.js";
import userModel from "../schemas/users.js";

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
    const response = await userModel.findById({ _id: id });
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
      shop,
    } = req.body;

    const passwordHash = await encrypt(password);

    const response = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        fullName,
        email,
        username,
        password: passwordHash,
        role,
        locations,
        paymentLimit,
      }
    );

    if (!response) {
      throw { message: "User not found", status: 404 };
    }

    res.send({
      data: {
        _id: id,
        fullName,
        email,
        username,
        password: passwordHash,
        role,
        locations,
        paymentLimit,
        shop,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "User not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getUsers, getUser, updateUser, deleteUser };
