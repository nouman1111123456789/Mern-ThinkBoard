import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import RateLimiter from "./middleware/ratelimiter.js";
import cors from "cors"
import path from "path"

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
    pp.use(cors({
    origin : "http://localhost:5173"
}));
}

app.use(express.json());
app.use(RateLimiter);


//this url is same in all api so when some user use this url this will redirect to noteRoutes.js file
app.use("/api/notes", noteRoutes)

app.use(express.static(path.join(__dirname,"../Frontend/dist")));

if(process.env.NODE_ENV === "production"){
    app.get("*",(res,req)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
})
}


connectDB().then(()=>{
app.listen(port, ()=>{
    console.log("server is running on port:",port);
})
})
