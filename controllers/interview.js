const express = require("express");
const Attempt = require("../models/attempt");
const Question = require("../models/questionBank");
const Answer = require("../models/answer");

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

async function handlePostInterview(req,res){

    const {answer} = req.body;
}


module.exports = {
    handleGetInterview,
    handlePostInterview
}