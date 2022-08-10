import mongoose from "mongoose";
import "../../config/env.js";
import connectDB from "../../config/db.js";
import data from "./utils.js";

const seedStart = async () => {
  await connectDB(process.env.DB_URI);
  console.log("Starting seeder");
};

const seedDB = async () => {
  for (let index = 0; index < data.length; index++) {
    await data[index].model.deleteMany({});
    await data[index].model.insertMany(data[index].seed);
    console.log(`**** =>  ${data[index].label} successfully seeded!`);
  }
};

seedDB()
  .then(() => {
    console.log("Finished seeder");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

seedStart();
