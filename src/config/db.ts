import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB", error);
    process.exit(1);
  }
};
