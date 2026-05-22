const express = require("express");
const User = require("../models/user");

async function handleGetUserSignUp(req,res){
    return res.sendFile(require("path").resolve("./views/signup.html"));

}
    const PATH = require("path").resolve("./views/signup.html");
console.log("Path: ", PATH);

async function handlePostUserSignUp(req,res){
    console.log("Body: ", req.body)
    const {} = req.body;
    const user = await User.create({
    fullname,
    username,
    password,
    gender,
    qualifications,
    role,
    profileImageURL: req.file.path
    });
    return res.send("Registered succcessfully");
}

async function handleGetUserLogin(req,res){
}

async function handlePostUserLogin(req,res){

    res.cookies("uid", token, {

    })
}

module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin
}