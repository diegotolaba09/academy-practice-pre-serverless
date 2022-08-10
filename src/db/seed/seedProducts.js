import mongoose from "mongoose";

const seedProducts = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Table Samsung A5",
    description: "Display 10.1 inch, processor A5, RAM 2GB, storage 16GB",
    price: 100000,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "PC HP Pavillion",
    description: "Intel Core i7, RAM 16GB, storage 1TB",
    price: 89000,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Celular Samsung Galaxy S10",
    description: "Snapdragon 845, RAM 8GB, storage 128GB",
    price: 65000,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Lenovo Thinkpad",
    description: "AMD Ryzen 7, RAM 16GB, storage 1TB",
    price: 124000,
  },
];

export default seedProducts;
