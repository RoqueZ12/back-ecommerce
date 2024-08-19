import express from 'express'
import { PORT } from './src/env/env.js'
import { userRoutes } from './src/routes/userRoutes.js'
import { productRoutes } from './src/routes/productRoutes.js'
import { cartRoutes } from './src/routes/cartRoutes.js'
import { mongoosedb } from './src/database/mongoosedb.js'
import { corsMiddleware } from './src/config/cors.js'
import { userRoutesL } from './src/routes/userRoutes.js'
import { validToken } from './src/config/validtoken.js'
import cookieParser from 'cookie-parser'
import { SECRETKEY } from './src/env/env.js'
import jwt from 'jsonwebtoken'
const app = express()
app.use(corsMiddleware())
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use('/user',userRoutes)
app.use('/auth', userRoutesL)

// Ruta protegida que requiere el token
app.get('/api/protected', validToken, (req, res) => {
  // Si el middleware pasa, req.user estará disponible
  res.status(200).json({ message: 'Protected data', user: req.user });
});
//PRODUCTS
app.use('/products', productRoutes)
//CART
app.use('/cart', cartRoutes)

//USER
mongoosedb()
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})