import express from 'express'
import cors from 'cors'
import config from './config/config.js'
import morgan from 'morgan'
import dependencies from './config/dependencies.js'
import cookieParser from 'cookie-parser';
import { routes } from './Routes/index.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser());

app.use(cors({
    origin: config.BASE_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}))

app.use('/', routes(dependencies))



export { app }