import mongoose from 'mongoose';
import { DB } from '../env/env.js';

export const mongoosedb = async () => {
  try {
    // Conectar a la base de datos MongoDB
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    // Manejar errores de conexión
    console.error('Error connecting to MongoDB:', error);
  }
};
