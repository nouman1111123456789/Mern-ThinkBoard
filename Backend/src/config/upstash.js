
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis"

import dotenv from "dotenv";
dotenv.config();

//create a ratelimit that allows only 10 request in 20 seconds

const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter :Ratelimit.slidingWindow (100,"60 s")
})

export default ratelimit;