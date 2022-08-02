const userModel = require("../models/users");

const getUsers = async (_req, res) => {
  const users = await userModel.find({}).populate({
    path: "shop",
    populate: {
      path: "orders",
      populate: {
        path: "products",
      }
    },
  });
  res.send({ data: users });
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userModel.findById({ _id: id });
    if (!response) {
      throw { message: "User not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

const createUser = async (req, res) => {
  try {
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
    const responseUser = await userModel.create({
      fullName,
      email,
      username,
      password,
      role,
      locations,
      paymentLimit,
      shop,
    });
    res.send({ data: responseUser });
  } catch (error) {
    res.json({ error });
  }
};

const updateUser = async (req, res) => {
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
    const response = await userModel.findByIdAndUpdate(
      { _id: id },
      { fullName, email, username, password, role, locations, paymentLimit }
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
        password,
        role,
        locations,
        paymentLimit,
        shop,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "User not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
