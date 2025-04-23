import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiErrors } from "../utils/ApiErrors.js";

import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  //get the data from cookie because we have the access due to the middleware cookie-parser
  //validate the data
  //verify with JWT sceret

  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.repalce("Bearer ", "");
    if (!token) {
      throw new ApiErrors(401, "Unauthorised User Credentials");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if(!user){
      throw new ApiErrors(401, "Invalid Access Token");
    }

    req.user = user;

    next();


  } catch (error) {
    throw new ApiErrors(401, error?.message || "Invalid Access Token")
  }
});

export { verifyJWT };
