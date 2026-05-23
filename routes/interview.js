const express = require("express");
const interviewRouter = express.Router();
const {handleGetInterview, handlePostInterview} = require("../controllers/interview")
const Attempt = require("../models/attempt");
const Question = require("../models/questionBank")
const Answer = require("../models/answer")


interviewRouter.get("/:id", handleGetInterview);
interviewRouter.post("/:id", handlePostInterview);

interviewRouter.get("/fetch",async (req,res) => {
    const attemptId = req.cookies?.attempt;
    if(!attemptId) return res.json({error: "Please Start an Interview first"});
    const attempt = await Attempt.findById(attemptId).populate("createdBy", "role");
    if (!attempt || !attempt.createdBy) {
    return res.status(404).json({ error: "Invalid attempt" });
    }
    if(attempt.questions && attempt.questions.length > 0){
        await attempt.populate("questions");
        return res.json(attempt.questions);
    } 
    const role = attempt.createdBy.role;
    const attemptQuestions = await Question.aggregate([
                            { $match: { role } },
                            { $sample: { size: 20 } }
                            ]);
    console.log("AttemptQuestions: ", attemptQuestions);
    attempt.questions = attemptQuestions.map(q => q._id);
    await attempt.save().pop;
    return res.json(attempt);
});

module.exports = interviewRouter;