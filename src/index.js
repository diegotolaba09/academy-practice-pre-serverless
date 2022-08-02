require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const { dbConnect } = require("../config/mongo");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

dbConnect();

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
