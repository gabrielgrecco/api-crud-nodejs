import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import contaRoutes from "./src/routes/ContaRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/contas", contaRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);

connectDB();
