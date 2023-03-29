const cloudinary = require("cloudinary").v2;
const fs = require('fs');


// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


async function uploadToCloudinary(locaFilePath) {
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder

  var mainFolderName = "main"
  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath

  return cloudinary.uploader.upload(locaFilePath, { "public_id": filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)

      return {
        message: "Success",
        url: result.url
      };
    }).catch((error) => {
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)
      return { message: "Fail", };
    });
}

module.exports = uploadToCloudinary;