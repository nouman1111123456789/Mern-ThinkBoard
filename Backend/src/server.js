import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import RateLimiter from "./middleware/ratelimiter.js";
import cors from "cors"

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

// middleware
app.use(cors({
    origin : "http://localhost:5173"
}));
app.use(express.json());
app.use(RateLimiter);


//this url is same in all api so when some user use this url this will redirect to noteRoutes.js file
app.use("/api/notes", noteRoutes)

connectDB().then(()=>{
app.listen(port, ()=>{
    console.log("server is running on port:",port);
})
})

// mongodb+srv://noumanch553_db_user:noumanch553_db_user@cluster0.fo6uqj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//noumanch553_db_user password