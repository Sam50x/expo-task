import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import { configDotenv } from 'dotenv'
import { successHandler, globalErrorHandler } from './src/middleware/response.middleware.js'
import authRouter from './src/auth/auth.route.js'

configDotenv()

const app = express()

app.use(express.json())
app.use(cors())
app.use(successHandler)

app.use('/auth', authRouter)

app.use(globalErrorHandler)

app.get('/', (req, res) => {
    return res.json({ msg: 'Hello 👋' })
})

const port = 8888

app.listen(port, async () => {
    await connectDb()
    console.log(`Server is listening on ${port}`)
})