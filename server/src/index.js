import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'

import users from './routes/users.js'
import projects from './routes/projects.js'
import achievements from './routes/achievements.js'

dotenv.config()
const app = express()

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*' }))
app.use(express.json())
app.use(morgan('dev'))

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

// API routes
app.get('/', (req, res) => res.json({ message: 'Portfolio API running 🚀' }))
app.use('/api/users', users)
app.use('/api/projects', projects);
app.use('/api/achievements', achievements)

// Start Server
const PORT = process.env.PORT || 4000
app.listen(PORT, async () => {
  await connectDB()
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
})
