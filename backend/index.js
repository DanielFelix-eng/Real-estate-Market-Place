import express from 'express'
import cookieParser from 'cookie-parser'
import { conectDB } from './db/db.js'
import dotenv from 'dotenv'
import authRoute from './routes/authroutes.js'
import PropertyRoutes from './routes/propertyroutes.js'
import cors from 'cors'
import path from 'path'

dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/properties', PropertyRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({ message })
})

conectDB()
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})