const express = require("express");
const User = require("../models/user");

async function handleGetUserSignUp(req,res){
    return res.sendFile(require("path").resolve("./views/signup.html"));
}

async function handlePostUserSignUp(req,res){
    const {} = req.body;
    const user = await User.create({

    });
    return res.redirect("/user/login");
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