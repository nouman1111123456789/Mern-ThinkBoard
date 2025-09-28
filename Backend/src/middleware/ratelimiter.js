import ratelimit from "../config/upstash.js";

const RateLimiter = async (req,res,next)=>{
try {
    const {success} = await ratelimit.limit("my-limit-key");
    if(!success)res.status(429).json({message : "Too many Request: try again later"});

    next();
} catch (error) {
    console.log("error in rate limit",error);
    next(error);
}
}

export default RateLimiter;