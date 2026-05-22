const express = require("express");
const User = require("../models/user");
const {cloudinary,upload} = require("../cloudConfig")
const fs = require("fs");
async function handleGetUserSignUp(req,res){
    return res.sendFile(require("path").resolve("./views/signup.html"));

}
    const PATH = require("path").resolve("./views/signup.html");
console.log("Path: ", PATH);

async function handlePostUserSignUp(req,res){
    console.log("Body: ", req.body)
    const {fullname,username,password,age,gender, qualifications,role} = req.body;
    let imageUrl = null;

if (req.file) {
    const photo = await cloudinary.uploader.upload(req.file.path, {
        folder: "interview-app",
    });
    fs.unlinkSync(req.file.path);
    imageUrl = photo.secure_url;
}
    const user = await User.create({
    fullname,
    username,
    password,
    gender,
    qualifications,
    role,
    profileImageURL: imageUrl,
    });
    return res.sendFile(require("path").resolve("./views/login.html"));
}

async function handleGetUserLogin(req,res){
    return res.sendFile(require("path").resolve("./views/login.html"));
}

async function handlePostUserLogin(req,res){
    const {username,password} = req.body;
    const token = await User.matchPassword(username,password)
     if(!token){
        return res.sendFile(require("path").resolve("./views/login.html"), {
            error: "Invalid username or password"
        });

    }
    else{
    res.cookie("uid", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
    });
    return res.redirect("/");
    }
}

module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin
}