import express from "express"
import dotenv, { config } from "dotenv";
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import route from "./routes/user.route.js";

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors())
dotenv.config();

const PORT  = process.env.PORT || 4000;
const URL  = process.env.MONGODB_URL

const connectDatabase =async()=>{
    try {
        await mongoose.connect(URL)
        console.log("database is connected successfully!")
    } catch (error) {
        console.log(error)
    }
}

app.use("/api", route)

app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
    await connectDatabase()
})