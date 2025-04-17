import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { ApiErrors } from "../utils/ApiErrors.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //get the data from req.body and on the fly destructor the data
  const { userName, email, password, fullName } = req.body;

  //validate the data-not-empty
  if (
    [userName, email, password, fullName]
      .some((field) => field?.trim() === "")
  ) {
    throw new ApiErrors(404, "All field are required");
  }

  //check if the user already exits with username and email
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  //if exits reponse with a Error message
  if (existingUser) {
    throw new Error(409, "User with email or unserName already exits");
  }

  //check for images, check for avatar

  //We always recieves the data from the req.body, but as we have attached a multer miidleware in the user route, so here multer gives us more options to access the data files, images etc
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar Image is required");
  }

  //upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //Check if the avatar really exits because avatar is a required field if it is not present then their will be an error in Database
  if (!avatar) {
    throw new ApiErrors(400, "Avatar Image is required");
  }

  //if not create a new user in the dataBase
  const newlyCreatedUser = await User.create({
    userName: userName.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  //Then filter out the data which we don't want to sent with the response
  const createdUser = await User.findById(newlyCreatedUser._id).select(
    "-password -refreshToken"
  );

  //  check for user creation
  if (!createdUser) {
    throw new ApiErrors(500, "Something went wrong while creating the user")
  }

  //  the final response to the user that the registration is successful
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User is Registered successfully")
  )
});

export { registerUser };
