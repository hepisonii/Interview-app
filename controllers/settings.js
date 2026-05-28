const express = require("express");
const User = require("../models/user");
const {upload, cloudinary} = require("../cloudConfig");
const fs = require("fs");


async function handleGetSettings(req,res){
    return res.sendFile(require("path").resolve("./views/settings.html"));
}

async function handlePostSettings(req,res){
    const id = req.user._id;
    if(!id){
        return res.json({
            error: "You are not authenticated to update your Profile"
        })
    }
    const {fullname, gender, role} = req.body;
    let imageUrl;
    if (req.file) {
        const photo = await cloudinary.uploader.upload(req.file.path, {
            folder: "interview-app",
        });
        if (req.user.profileImageId) {
        await cloudinary.uploader.destroy(req.user.profileImageId);
        }
        fs.unlinkSync(req.file.path);
        imageUrl = photo.secure_url;
        profileImageId = photo.public_id;
    }
    else{
        imageUrl = req.user.profileImageURL;
        profileImageId = req.user.profileImageId
    }
    const age = Number(req.body.age);
    const user = await User.findByIdAndUpdate(id, {
        fullname,
        age,
        gender,
        role,
        profileImageURL: imageUrl,
        profileImageId,
    },{
        returnDocument: "after",
    });
    return res.json({
        data: "User Profile Updated Successfully"
    });
}

module.exports = {
    handleGetSettings,
    handlePostSettings
}