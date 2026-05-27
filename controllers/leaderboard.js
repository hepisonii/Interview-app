const express = require("express");
const Attempt = require("../models/attempt");

async function handleGetLeaderBoard(req,res){
   const backendTopScorers = await Attempt.aggregate([
  {
    $sort: { totalScore: -1 } // highest first
  },
  {
    $match: {
      "role": "backend",
    }
  },
  {
    $group: {
      _id: "$createdBy",
      highestScore: { $first: "$totalScore" },
      attempt_no: { $first: "$attempt_no" },
      role: {$first: "$role"},
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
  const frontendTopScorers = await Attempt.aggregate([
  {
    $sort: { totalScore: -1 } // highest first
  },
  {
    $match: {
      "role": "frontend",
    }
  },
  {
    $group: {
      _id: "$createdBy",
      highestScore: { $first: "$totalScore" },
      attempt_no: { $first: "$attempt_no" },
      role: {$first: "$role"},
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
const cybersecurityTopScorers = await Attempt.aggregate([
  {
    $sort: { totalScore: -1 } // highest first
  },
  {
    $match: {
      "role": "cybersecurity",
    }
  },
  {
    $group: {
      _id: "$createdBy",
      highestScore: { $first: "$totalScore" },
      attempt_no: { $first: "$attempt_no" },
      role: {$first: "$role"},
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
const topScorers = {
  frontend: frontendTopScorers,
  backend: backendTopScorers,
  cybersecurity: cybersecurityTopScorers,
}
    return res.json(topScorers);
}

module.exports = {
    handleGetLeaderBoard
}