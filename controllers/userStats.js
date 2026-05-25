const express = require("express");
const User = require("../models/user");
const Attempt = require("../models/attempt");

async function handleGetStats(req,res){
    console.log("API FETCH HIT");
    const id = req.params.id;
    const user_data = await User.findById(id);
    const attempts = await Attempt.find({createdBy: id}).sort({totalScore: 1});
    console.log("Attempts: ", attempts);
    const averageScore = attempts.reduce((acc, current) => {
        if(!current.totalScore){
            return acc;
        }
        return acc + current.totalScore;
    }, 0)/attempts.length;
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
        totalattempts: attempts.length,
        user,
        averageScore,
        highestScore
    });
}

module.exports = {
    handleGetStats
}