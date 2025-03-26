import "express-async-errors";
import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middleware/erro";

const app = express();
app.use(express.json());
router(app);

app.use(erroMiddleware);
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch((err) => {
    console.error(err);
  });
export default app;
