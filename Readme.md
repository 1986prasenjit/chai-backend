# chai aur Code with backend


## To Generate random string for Access Token and Refresh Token
#### [node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]


#### What problem I have faced 
### While generating accessToken and refreshToken which is required for my login written this method what I have done I have awaited  
const accessToken = await user.generateAccessToken(); 
const refreshToken = await user.generateRefreshToken();

## which is not required Api Call was success but the problem I have faced that when I have checked in my POSTMAN the value of my accessToken and refreshToken it was undefined because of this await
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken =   user.generateAccessToken();
    const refreshToken =  user.generateRefreshToken();
    // console.log(`Line no 16 ${accessToken}, ${refreshToken}`);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(500, "Something went wrong while creating the user");
  }
};