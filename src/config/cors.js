import cors from 'cors'

// ACCEPTED_ORIGINS es un array que contiene los orígenes permitidos para las solicitudes CORS.
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5173',
  
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
