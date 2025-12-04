import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './database'; // Importa nossa conexão configurada

const PORT = process.env.PORT || 3000;

// Função assíncrona para iniciar tudo
const startServer = async () => {
  try {
    // Testa conexão e sincroniza (cria tabelas)
    // Use force: true APENAS se quiser resetar o banco (cuidado!)
    await sequelize.sync({ force: false }); 
    console.log('✅ DATABASE CONNECTED AND SYNCED');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ DATABASE ERROR:', error);
  }
};

startServer();