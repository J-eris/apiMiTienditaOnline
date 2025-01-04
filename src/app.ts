import express from "express";
import sequelize from "./config/database";
import routes from "./routes/index";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware";
import corsConfig from "./config/corsConfig";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

app.use(corsConfig);

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente.");
    // await sequelize.sync();
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
