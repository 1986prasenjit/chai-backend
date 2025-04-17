import dotenv from "dotenv";

import connectDB from "./dbConnect/index.js";

import app from "./app.js";

dotenv.config({
    path:"./.env"
});

const PORT = process.env.PORT || 5000;


connectDB()
        .then(()=> {
            app.listen(PORT, ()=> {
                console.log(`Server is running at port ${PORT}`);
            })
        })
        .catch((error)=> {
            console.log(`Error while Starting the Server`, error);
            process.exit(1);
})