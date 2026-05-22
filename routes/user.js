const express = require("express");
const userRouter = express.Router();
const {upload} = require("../cloudConfig")
const {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout,
    handleGetInterview,
    handlePostInterview
} = require("../controllers/user");



userRouter.get("/signup", handleGetUserSignUp);
userRouter.post("/signup",upload.single("photo"), handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login", handlePostUserLogin);
userRouter.get("/logout", handleGetUserLogout);
userRouter.get("/start-interview", handleGetInterview);
userRouter.post("/start-interview", handlePostInterview);

userRouter.get("/api/interview", async (req,res) => {
    
})
module.exports = userRouter;