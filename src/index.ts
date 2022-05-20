// ======== //
// Modules //
// ====== //

import express, { Express, Request, Response } from "express"
import * as dotenv from "dotenv"
import cors from "cors";
import helmet from "helmet"
import compression from 'compression'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'

import './configs/db'
import errorHandler from './helpers/errorHandler'
import V1 from './routes/v1/index'
// import jwt from './middleware/jwtAuth'


// ======================== //
// App Config and Variables //
// ======================== //

dotenv.config();

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app: Express = express()

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler);
// app.use(jwt());

// ==================== //
// Static File Serving //
// ================== //

app.use("/v1/patient/documents", express.static(path.join(__dirname, "bucket/patient-docs")));
app.use("/v1/doctor/documents", express.static(path.join(__dirname, "bucket/doctor-docs")));
app.use("/v1/appointment/documents", express.static(path.join(__dirname, "bucket/appointment-docs")));

app.use(session({
  secret: "zxcv",
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.info('Request:', req.path)
  next()
})

app.use('/v1', V1);

app.get('/', (req: Request, res: Response) => {
  return res.send("Yes it works")
})


// ============ //
// Server Init //
// ========== //

app.listen(PORT, () => {
  console.log(`Hello Medimi!`)
})