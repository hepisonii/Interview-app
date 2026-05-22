const express = require("express");
const userRouter = express.Router();
const {upload} = require("../cloudConfig")
const {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout
} = require("../controllers/user");



userRouter.get("/signup", handleGetUserSignUp);
userRouter.post("/signup",upload.single("photo"), handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login", handlePostUserLogin);
userRouter.get("/logout", handleGetUserLogout);
module.exports = userRouter;