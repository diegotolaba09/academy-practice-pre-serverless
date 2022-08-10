import mongoose from "mongoose";

const seedUsers = [
  {
    _id: new mongoose.Types.ObjectId(),
    fullName: "Juan Perez",
    email: "jperez@hola.com",
    username: "jperez",
    password: "$2a$10$kjJwcq80CKqDGYmja5XQEOWlkZ3.ApMRUVXPvP0GB5cjjvg56Gmam", //password: "123456",
    role: "admin",
    locations: {
      country: "Mexico",
      city: "Mexico City",
      address: "Calle de la paz",
      code: "12345",
    },
    availableLimit: true,
    shop: new mongoose.Types.ObjectId(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fullName: "NX Example 2",
    email: "email@hola.com",
    username: "nxexample2",
    password: "$2a$10$kjJwcq80CKqDGYmja5XQEOWlkZ3.ApMRUVXPvP0GB5cjjvg56Gmam", //password: "123456",
    role: "customer",
    locations: {
      country: "Argentina",
      city: "Bs As",
      address: "Calle Italia",
      code: "54321",
    },
    availableLimit: true,
    shop: new mongoose.Types.ObjectId(),
  },
];

export default seedUsers;
