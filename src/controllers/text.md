const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(
      500,
      "Something went wrong while creating the accessToken and refreshToken"
    );
  }
};
const loginUser = asyncHandler(async (req, res) => {
//get data from req.body
  const { userName, email, password } = req.body;

  //validate the data
  if (!userName || !email) {
    throw new ApiErrors(400, "userName or email is required");
  }
  //Check if the user exits
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!existingUser) {
    throw new ApiErrors(400, "User is not registered");
  }

  //if user exits then check the password
  const isPasswordValid = await existingUser.isPasswordMatch(password);

  if (!isPasswordValid) {
    throw new ApiErrors(401, "Invalid user Credentials");
  }

  //if exits then check with access token or refresh token

  const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(
    existingUser._id
  );

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});