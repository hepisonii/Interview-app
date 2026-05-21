const express = require("express");
const User = require("../models/user");

async function handleGetUserSignUp(req,res){
    return res.sendFile(require("path").resolve("./views/signup.html"));

}
    const PATH = require("path").resolve("./views/signup.html");
console.log("Path: ", PATH);

async function handlePostUserSignUp(req,res){
    console.log("Body: ", req.body)
    
    return res.send("/user/login");
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