import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import { configDotenv } from 'dotenv'

configDotenv()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.json({ msg: 'Hello 👋' })
})

const port = 8888

app.listen(port, async () => {
    await connectDb()
    console.log(`Server is listening on ${port}`)
})