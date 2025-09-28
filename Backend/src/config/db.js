import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Error in connecting database",error);
        process.exit(1) // 1 means exit with failure
    }
}

export default connectDB;