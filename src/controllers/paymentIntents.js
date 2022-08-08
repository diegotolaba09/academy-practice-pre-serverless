import paymentIntentModel from "../schemas/paymentIntents.js";
import shopModel from "../schemas/shops.js";
import userModel from "../schemas/users.js";
import { getUserAuth } from "./utils.js";

const getPaymentIntents = async (_req, res, next) => {
  try {
    const paymentIntent = await paymentIntentModel.find({}).populate({
      path: "products",
    });
    res.send({ data: paymentIntent });
  } catch (err) {
    next(err);
  }
};

const getPaymentIntent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await paymentIntentModel.findById(id);
    if (!response) {
      throw { message: "Payment Intent not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, status, products, shop: shopId } = req.body;

    const paymentIntent = await paymentIntentModel.create({
      amount,
      status,
      products,
      shop: shopId,
    });

    const shopData = await shopModel.findById({ _id: shopId });

    if (shopData) {
      shopData.paymentIntents.push({ _id: paymentIntent._id });
      await shopData.save();
    }

    res.send({ data: paymentIntent });
  } catch (err) {
    next(err);
  }
};

const payIntentToPay = async (req, res, next) => {
  try {
    const { id: payId } = req.params;
    const { userId } = getUserAuth(req);

    const user = await userModel.findById({ _id: userId });

    if (!user?.availableLimit) {
      throw { message: "User has no available limit", status: 400 };
    }

    const payment = await paymentIntentModel.findOneAndUpdate(
      { _id: payId, status: "pending" },
      { status: "finished" },
      { new: true }
    );

    if (!payment) {
      throw { message: "Payment Intent not found", status: 404 };
    }

    res.send({ data: payment });
  } catch (err) {
    next(err);
  }
};

const updatePaymentIntent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, status, products } = req.body;
    const response = await paymentIntentModel.findByIdAndUpdate(
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

const deletePaymentIntent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await paymentIntentModel.findByIdAndDelete({ _id: id });
    if (!response) {
      throw { message: "Payment Intent not found", status: 404 };
    }
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
};

export {
  getPaymentIntents,
  getPaymentIntent,
  createPaymentIntent,
  payIntentToPay,
  updatePaymentIntent,
  deletePaymentIntent,
};
