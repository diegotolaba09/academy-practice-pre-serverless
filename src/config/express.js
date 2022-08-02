import express from "express";
import routes from "../routes/index.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

export default app;
