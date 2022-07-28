const userModel = require("../models/users");

const getUsers = async (_req, res) => {
  const users = await userModel.find({});
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
    const { firstName, lastName, email, age } = req.body;
    const responseUser = await userModel.create({
      firstName,
      lastName,
      email,
      age,
    });
    res.send({ data: responseUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age } = req.body;
    const response = await userModel.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, email, age }
    );
    if (!response) {
      throw { message: "User not found", status: 404 };
    }
    res.send({ data: { _id: id, firstName, lastName, email, age } });
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
