import dotenv from 'dotenv';
import connectDB from './config/db.js';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB e inicia o servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
};

startServer();