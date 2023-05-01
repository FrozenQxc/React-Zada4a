import cors from 'cors'
import dotenv from 'dotenv-safe'
import express from 'express'
import mongoose from 'mongoose'

import authRouter from './routes/auth.js'

const app = express()

dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)

async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://frozenqxc:qwerty1@cluster0.apl2ul0.mongodb.net/test'
		)

		app.listen(5000, () => console.log(`Server ok. Port:${5000}`))
	} catch (error) {
		console.log(error)
	}
}

start()
