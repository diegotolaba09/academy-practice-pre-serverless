import app from "./express.js";
import { createServer } from "http";

const httpServer = createServer(app);

export default httpServer;
