import seedProducts from "./seedProducts.js";
import seedShops from "./seedShops.js";

const seedPaymentIntent = [
  {
    _id: seedShops[0].paymentIntents[0],
    amount: 254000,
    status: "pending",
    products: [seedProducts[0]._id, seedProducts[1]._id, seedProducts[2]._id],
    shop: seedShops[0]._id,
  },
  {
    _id: seedShops[1].paymentIntents[0],
    amount: 278000,
    status: "pending",
    products: [seedProducts[3]._id, seedProducts[1]._id, seedProducts[2]._id],
    shop: seedShops[1]._id,
  },
];

export default seedPaymentIntent;
