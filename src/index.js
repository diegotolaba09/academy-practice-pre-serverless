import connectDB from "./config/db.js";
import "./config/env.js";
import httpServer from "./config/http.js";

const bootstrap = async () => {
  await connectDB(process.env.DB_URI);

  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });
};

bootstrap();
