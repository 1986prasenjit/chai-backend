import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const userScheme = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//! Encrypting the password
userScheme.pre("save", async function (next) {
  //! We will do nothing if the password field doesnot Change
  if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
  next();
});


//!Decrypting the password
userScheme.methods.isPasswordMatch = async function(password){
   return await bcrypt.compare(password,this.password)
}

//!For Access Toke
userScheme.methods.generateAccessToken = function(){
    jwt.sign
    (
        {
            id:this._id,
            userName:this.userName,
            email:this.email,
        },

            process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


//!For Refresh Toke
userScheme.methods.generateRefreshToken = function(){
    jwt.sign
    (
        {
            id:this._id,
            userName:this.userName,
            email:this.email,
        },

            process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userScheme);

export { User };
