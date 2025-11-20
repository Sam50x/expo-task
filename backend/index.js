import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import { configDotenv } from 'dotenv'
import { successHandler, globalErrorHandler } from './src/middleware/response.middleware.js'
import authRouter from './src/auth/auth.route.js'
import projectRouter from './src/modules/project.route.js'
import zoneRouter from './src/modules/zone.route.js'
import developerRouter from './src/modules/developer.route.js'
import unitRouter from './src/modules/unit.route.js'
import searchRouter from './src/modules/search.route.js'

configDotenv()

const app = express()

app.use(express.json())
app.use(cors())
app.use(successHandler)

app.use('/auth', authRouter)
app.use('/projects', projectRouter)
app.use('/zones', zoneRouter)
app.use('/developers', developerRouter)
app.use('/units', unitRouter)
app.use('/search', searchRouter)

app.use(globalErrorHandler)

app.get('/', (req, res) => {
    return res.json({ msg: 'Hello 👋' })
})

const port = 8888

app.listen(port, async () => {
    await connectDb()
    console.log(`Server is listening on ${port}`)
})