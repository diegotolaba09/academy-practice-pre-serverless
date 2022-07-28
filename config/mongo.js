const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, _res) => {
      if (err) {
        console.log("**** Conection Error! ****");
      } else {
        console.log("**** Successful Connection! ****");
      }
    }
  );
};

module.exports = { dbConnect };
