import orderModel from "../models/orders.js";

const getOrders = async (_req, res) => {
  const orders = await orderModel.find({}).populate({
    path: "products",
  });
  res.send({ data: orders });
};

const createOrder = async (req, res) => {
  try {
    const { amount, status, products } = req.body;
    const response = await orderModel.create({
      amount,
      status,
      products,
    });
    res.send({ data: response });
  } catch (error) {
    res.json({ error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await orderModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Order not found", status: 404 };
    }
    res.send({ data: response });
  } catch (error) {
    res.json(error);
  }
};

export { getOrders, createOrder, deleteOrder };
