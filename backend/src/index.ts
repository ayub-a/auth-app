import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env'
import { connectToDatabase } from './config/db'


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}))
app.use(cookieParser())


app.listen(
    PORT,
    async () => {
        console.log(`Server running on PORT ${PORT} in ${NODE_ENV} mode.`)
        await connectToDatabase()
    }
)
