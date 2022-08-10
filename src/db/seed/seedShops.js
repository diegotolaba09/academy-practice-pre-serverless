import mongoose from "mongoose";
import seedUsers from "./seedUsers.js";

const seedShops = [
  {
    _id: seedUsers[0].shop,
    name: "NX Commerce",
    description: "NX Commerce is a shopping cart for your needs",
    address: "Cordoba 123",
    users: [seedUsers[0]._id],
    paymentIntents: [new mongoose.Types.ObjectId()],
  },
  {
    _id: seedUsers[1].shop,
    name: "Ecommerce Example",
    description: "Ecmercado Example is a shopping cart for your needs",
    address: "Catamarca 123",
    users: [seedUsers[1]._id],
    paymentIntents: [new mongoose.Types.ObjectId()],
  },
];

export default seedShops;
