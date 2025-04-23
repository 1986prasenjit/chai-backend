import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { ApiErrors } from "../utils/ApiErrors.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //get the data from the request.body
  //validate the data
  //If data present then check the user is already present in the database
  //check for images, check for avatar
  // upload the the images to cloudinary
  // Create a new User object in the data base
  // remove the fields which u don't wnat to sent in the respose sent to the user
  // check for user creations
  // if everything goes right return a response that the user is created successfully

  
});

export { registerUser };
