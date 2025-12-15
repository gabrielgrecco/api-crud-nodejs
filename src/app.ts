import express from "express";
import contaRoutes from "./routes/ContaRoutes";

const app = express();
app.use(express.json());

app.use("/contas", contaRoutes);

export default app;
