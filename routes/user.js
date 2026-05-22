const express = require("express");
const userRouter = express.Router();
const {} = require("../controllers/user");
const {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin
} = require("../controllers/user");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blogify",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const uploads = multer({storage});



userRouter.get("/signup", handleGetUserSignUp);
userRouter.post("/signup",uploads.single("photo"), handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login", handlePostUserLogin);

module.exports = userRouter;