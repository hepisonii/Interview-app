const express = require("express");
const Attempt = require("../models/attempt");
const Question = require("../models/questionBank");
const Answer = require("../models/answer");
const evaluateAnswers = require("../ai_integration/openai");
const mongoose = require("mongoose");

async function handleGetInterview(req,res){
    const attemptId = req.cookies?.attempt;
    const attempt = await Attempt.findById(attemptId).populate("createdBy", "role");
        if(attempt.questions && attempt.questions.length > 0){
            await attempt.populate("questions");
            return res.sendFile(require("path").resolve("./views/interview.html"));
        }
        const role = attempt.createdBy.role;
        const attemptQuestions = await Question.aggregate([
                                { $match: { role } },
                                { $sample: { size: 20 } }
                                ]);
        console.log("AttemptQuestions: ", attemptQuestions);
        attempt.questions = attemptQuestions.map(q => q._id);
        await attempt.save();
        console.log("Attempt: ", attempt);
        return res.sendFile(require("path").resolve("./views/interview.html"));
}

async function handlePostInterview(req, res) {
  const body = req.body;
  const payload = body.answers;
  const attemptId = req.cookies?.attempt;
  const results = await evaluateAnswers(payload);
    console.log("AI response: ",results);
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

  try{
      await Answer.insertMany(finalData);
  }catch(err){
    return res.json({
        message: "This attempt is already taken before"
    });
  }
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