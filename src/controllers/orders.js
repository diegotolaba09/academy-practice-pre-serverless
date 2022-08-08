import orderModel from "../schemas/orders.js";

const getOrders = async (_req, res, next) => {
  try {
    const orders = await orderModel.find({}).populate({
      path: "products",
    });
    res.send({ data: orders });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await orderModel.findById(id);
    if (!response) {
      throw { message: "Order not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { amount, status, products } = req.body;
    const response = await orderModel.create({
      amount,
      status,
      products,
    });
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, status, products } = req.body;
    const response = await orderModel.findByIdAndUpdate(
      { _id: id },
      {
        amount,
        status,
        products,
      }
    );
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await orderModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Order not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
