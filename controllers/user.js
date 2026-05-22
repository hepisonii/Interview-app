const express = require("express");
const User = require("../models/user");
const {cloudinary,upload} = require("../cloudConfig")
const fs = require("fs");
async function handleGetUserSignUp(req,res){
    return res.render("signup");
}

async function handlePostUserSignUp(req,res){
    console.log("Body: ", req.body)
    const {fullname,username,password,age,gender, qualifications,role} = req.body;
    const entry = await User.findOne({username});
    if(entry){
        return res.render("signup", {
            error: "Username already exists"
        })
    }
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
    return res.redirect("/user/login");
}


async function handleGetUserLogin(req,res){
    return res.render("login");
}

async function handlePostUserLogin(req,res){
    const {username,password} = req.body;
    const token = await User.matchPassword(username,password)
     if(!token){
        return res.render("login", {
            error: "Invalid username or password"
        });
    }
    else{
    res.cookie("uid", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.redirect("/");
    }
}

async function handleGetUserLogout(req,res){
    res.clearCookie("uid", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.redirect("/user/login");
}

module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout,
}