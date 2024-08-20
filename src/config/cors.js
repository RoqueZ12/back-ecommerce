import cors from 'cors'
import { FRONTEND_URL } from '../env/env.js';
// ACCEPTED_ORIGINS es un array que contiene los orígenes permitidos para las solicitudes CORS.
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
   FRONTEND_URL  
];

// Exportamos la función costMiddleware
export const corsMiddleware =({accepteOrigins = ACCEPTED_ORIGINS} ={}) =>
  cors ({
  origin:(origin,callback)=>{
    if(accepteOrigins.includes(origin)){
      return callback(null, true)
    }
    if(!origin){
      return callback(null, true)
    }
  },
  credentials: true, // Permite el envío de cookies de autenticación
})
