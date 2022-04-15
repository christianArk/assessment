import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import { seedUser } from "./seeder/userSeeder";
import { seedProducts } from "./seeder/productSeeder";

const {PORT, DB_URI} = process.env
const app = express();

// db connection
mongoose.Promise =  global.Promise
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// will seed if collections are empty
seedUser()
seedProducts()

app.use(cors(
    {
        origin: '*'
    }
))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => { res.send("Start building something we'd remember!")});

app.listen(PORT, () => { console.log(`Your app is running on port ${PORT}`)});

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
})