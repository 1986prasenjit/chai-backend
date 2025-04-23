import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

    dotenv.config({
        path:"./.env"
    });

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;
            //upload file in Cloudinary
            const response = await cloudinary.uploader.upload
            (localFilePath,{
                resource_type:"auto",
            })
            //file has been uploaded successfully
            // console.log("file has been uploaded successfully");
            // console.log("File upload on Cloudinary", response.url);
            // console.log("The error is coming from cloudinary try part mainly");
            fs.unlinkSync(localFilePath);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath); // romove the locally saved temporary file as the upload operation got failed
            console.log("The error is coming from cloudinary mainly");
            return null;
        }
    }


    export { uploadOnCloudinary };