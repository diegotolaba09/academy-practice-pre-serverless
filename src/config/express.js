import express from "express";
import routes from "../routes/index.js";
import cors from "cors";
import { handleErrors } from "../middlewares/handleErrors.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(handleErrors);

export default app;
