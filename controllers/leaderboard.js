const express = require("express");
const Attempt = require("../models/attempt");

async function handleGetLeaderBoard(req,res){
  const {role,difficulty} = req.query;
  console.log("Check: ",role,difficulty)
   const topScorers = await Attempt.aggregate([
  {
    $match: {
      "role": role,
      "difficulty":difficulty,
    }
  },
  {
    $sort: { totalScore: -1 } // highest first
  },
  {
    $group: {
      _id: "$createdBy",
      highestScore: { $first: "$totalScore" },
      attempt_no: { $first: "$attempt_no" },
      role: {$first: "$role"},
      difficulty: {$first: "$difficulty"},
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $unwind: "$user"
  },
  {
    $project: {
      _id: "$user._id",
      highestScore: 1,
      attempt_no: 1,
      fullname: "$user.fullname",
      profileImageURL: "$user.profileImageURL",
      qualifications: "$user.qualifications",
    }
  },
  {
    $sort: { highestScore: -1 }
  },
  {
    $limit: 10
  }
]);
  console.log("Scoreboard: ",topScorers);
    return res.json({
      data: topScorers,
      success: "Passed",
      message: "LeaderBoard fetched successfully"
    });
}

module.exports = {
    handleGetLeaderBoard
}