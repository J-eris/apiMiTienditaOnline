import express from "express";
import sequelize from "./config/database";
import routes from "./routes/index";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente.");
    // await sequelize.sync();
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

start();
