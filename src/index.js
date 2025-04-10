import dotenv from "dotenv";

import connectDB from "./dbConnect/index.js";

dotenv.config({
    path:"./.env"
});


connectDB();