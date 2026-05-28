const express = require("express");
const User = require("../models/user");
const Attempt = require("../models/attempt");

async function handleGetStats(req,res){
    const id = req.params.id;
    const {role,difficulty} = req.query;
    const user_data = await User.findById(id);
    const attempts = await Attempt.find({createdBy: id, role,difficulty, totalScore: {$exists: true} }).sort({totalScore: 1});
    const averageScore = (attempts.reduce((acc, current) => {
        if(!current.totalScore){
            return acc;
        }
        return acc + current.totalScore;
    }, 0)/attempts.length).toFixed(2);
    const highestScore = attempts.reduce((max, current) => {
        return current.totalScore > max ? current.totalScore : max;
    }, 0);
    const user = {
        _id: user_data._id,
        qualifications: user_data.qualifications,
        fullname: user_data.fullname,
        age: user_data.age,
        gender: user_data.gender,
        profileImageURL: user_data.profileImageURL
    }
    return res.json({
        success: true,
        totalattempts: attempts.length,
        user,
        averageScore,
        highestScore
    });
}

module.exports = {
    handleGetStats
}