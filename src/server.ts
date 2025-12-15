import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./config/db";

dotenv.config();

connectDatabase();

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});