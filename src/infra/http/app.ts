import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import { v1Router } from "./api/v1"
import { dataService } from "../db"
import { Config } from "../../config/configuration"

const app = express()
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

const origin = {
  origin: Config.isProduction || Config.isStaginig ? "https://" : "*",
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.get("/healthz", (req, res) => {
  res.send("yo i'm up")
})

app.use("/api/v1", v1Router)
import "../../modules/messaging/subscribers"

// initialize db
dataService
  .initialize()
  .then(() => {
    console.log("Db💾 connected...")

    app.listen(Config.PORT || 400, () => {
      console.log(`[App]: Server listening on ${Config.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
  })

process.on("SIGINT", () => {
  dataService.destroy()
  // Gracefully exit the process
  process.exit(0)
})

export { app }
