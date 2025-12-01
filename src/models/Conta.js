import mongoose from "mongoose";

const contaSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  numeroConta: { type: String, required: true, unique: true },
  saldo: { type: Number, default: 0 }
});

export default mongoose.model("Conta", contaSchema);