import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();

//!Cross-Origin Resource Sharing (CORS) is a security mechanism implemented by web browsers to restrict access to resources from a different domain. It is designed to prevent malicious attacks such as cross-site scripting (XSS) and cross-site request forgery (CSRF).
app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//!It is used so that the backend can recieve more complex data like object and array structures to be encoded in the URL-encoded format. This is useful for handling form submissions where the client sends data in this format.
app.use(express.urlencoded({ extended: true }));

//!It is used to enable your server to understand and process incoming requests that have JSON payloads
app.use(express.json());

//!The cookie parser parses cookies and puts the cookie information on req object in the middleware.
app.use(cookieParser());


app.use(express.static("public"))

//!Import the user route here
import userRoute from "./routes/user.routes.js";



//!Build the API and also use Middleware to write the route properly with best industry practice
app.use("/api/v1/users", userRoute);


export default app;
