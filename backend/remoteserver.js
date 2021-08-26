import path from 'path'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import https from 'https'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

// import productRoutes from './routes/productRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import tcourseRoutes from './routes/tcourseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

const credentials = {
    key : fs.readFileSync('/etc/letsencrypt/live/api.teachun.ltd/privkey.pem'),
    cert : fs.readFileSync('/etc/letsencrypt/live/api.teachun.ltd/fullchain.pem')
};

const server = https.createServer(credentials, app);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())

// app.use('/api/products', productRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/tcourses', tcourseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/content', express.static(path.join(__dirname, '/content')))

app.use(notFound)
app.use(errorHandler)

const PORT = 443

server.listen(PORT)