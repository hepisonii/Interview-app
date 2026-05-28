const express = require("express");
const Attempt = require("../models/attempt");
const Question = require("../models/questionBank");
const Answer = require("../models/answer");
const evaluateAnswers = require("../ai_integration/openai");
const mongoose = require("mongoose");
const path = require("path");

async function handleGetInterview(req,res){
        return res.sendFile(path.join(__dirname,"../views/interview.html"));
}

async function handlePostInterview(req, res) {
  const body = req.body;
  const payload = body.answers;
  const attemptId = req.cookies?.attempt;
  const results = await evaluateAnswers(payload);
    const totalScore = results.reduce((sum, item) => {
        return sum + (item.score || 0);
    }, 0);
    const attempt = await Attempt.findById(attemptId);
    await Attempt.findByIdAndUpdate(attemptId, {
        totalScore
    });
  const finalData = payload.map((item) => {
    const evalItem = results.find(
      r => r.questionId === item.questionId
    );
    return {
      attemptId,
      questionId: item.questionId,
      answer: item.answer,
      score: evalItem?.score || 0,
      createdBy: req.user._id,
      aiFeedback: evalItem?.feedback || "",
    };
  });

  res.json({
    message: "Evaluation complete",
    data: finalData,
    totalScore
  });
}


module.exports = {
    handleGetInterview,
    handlePostInterview
}