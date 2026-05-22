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
    const photo = await cloudinary.uploader.upload(req.file.path, {
        folder: "interview-app",
    });
    fs.unlinkSync(req.file.path);
    const user = await User.create({
    fullname,
    username,
    password,
    gender,
    qualifications,
    role,
    profileImageURL: photo.secure_url,
    });
    return res.send("Registered succcessfully");
}

async function handleGetUserLogin(req,res){
    return res.sendFile(require("path").resolve("./views/login.html"));
}

async function handlePostUserLogin(req,res){

    res.cookie("uid", token, {

    })
}

module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin
}