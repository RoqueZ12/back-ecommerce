//validando token
import jwt from 'jsonwebtoken'
import { SECRETKEY } from "../env/env.js";

export const validToken = (req, res, next) => {

  try {
    const token = req.cookies.authToken
    if (!token) {   
        return res.status(401).json({ error: 'No token provided' })
    }   
    const decoded = jwt.verify(token, SECRETKEY)
    req.user = decoded.user
    next()
} catch (error) {
    res.status(401).json({ error: 'Invalid token' })
}
}