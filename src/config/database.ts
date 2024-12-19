import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Usuario } from "../models/Usuario";
import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { Cliente } from "../models/Cliente";
import { Producto } from "../models/Producto";
import { CategoriaProducto } from "../models/CategoriaProducto";
import { ProductoImagen } from "../models/ProductoImagen";
import { Orden } from "../models/Orden";
import { OrdenDetalles } from "../models/OrdenDetalles";
import { Carrito } from "../models/Carrito";
import { CarritoDetalles } from "../models/CarritoDetalles";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "mssql",
  dialectModule: require("tedious"),
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
  logging: false,
});

sequelize.addModels([
  Usuario,
  Estado,
  Rol,
  Cliente,
  Producto,
  CategoriaProducto,
  ProductoImagen,
  Orden,
  OrdenDetalles,
  Carrito,
  CarritoDetalles,
]);

export default sequelize;
