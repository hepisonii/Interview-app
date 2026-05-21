const express = require("express");
const userRouter = express.Router();
const {} = require("../controllers/user");
const {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin
} = require("../controllers/user");


userRouter.get("/signup", handleGetUserSignUp);
userRouter.post("/signup", handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login", handlePostUserLogin);

module.exports = userRouter;