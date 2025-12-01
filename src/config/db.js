import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao banco!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error.message);
    process.exit(1);
  }
}