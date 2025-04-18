import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

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
            //file ha sbeen uploaded successfully
            console.log("File upload on Cloudinary", response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath); // romove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }


    export { uploadOnCloudinary };