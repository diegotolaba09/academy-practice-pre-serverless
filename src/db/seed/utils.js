import User from "../../schemas/users.js";
import Shop from "../../schemas/shops.js";
import Product from "../../schemas/products.js";
import PaymentIntent from "../../schemas/paymentIntents.js";
import seedUsers from "./seedUsers.js";
import seedShops from "./seedShops.js";
import seedProducts from "./seedProducts.js";
import seedPaymentIntents from "./seedPaymentIntents.js";

const data = [
  {
    model: User,
    seed: seedUsers,
    label: "Users",
  },
  {
    model: Shop,
    seed: seedShops,
    label: "Shops",
  },
  {
    model: Product,
    seed: seedProducts,
    label: "Products",
  },
  {
    model: PaymentIntent,
    seed: seedPaymentIntents,
    label: "Payment Intents",
  },
];

export default data;
