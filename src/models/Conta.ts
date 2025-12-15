import mongoose, { Schema, Document } from "mongoose";

export interface IConta extends Document {
  nomeCliente: string;
  numeroConta: number;
  saldo: number;
}

const ContaSchema = new Schema<IConta>({
  nomeCliente: { type: String, required: true},
  numeroConta: { type: Number, required: true, unique: true },
  saldo: { type: Number, default: 0 }
});

export default mongoose.model<IConta>("Conta", ContaSchema);
