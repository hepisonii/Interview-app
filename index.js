require("dotenv").config();
const express = require("express");
const app = express();
const {connectMongoDB} = require("./connections/connect");
const Path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const interviewRouter = require("./routes/interview");
const Question = require("./models/questionBank");
const Attempt = require("./models/attempt");
const Answer = require("./models/answer");
connectMongoDB(process.env.MONGODB_URL);

app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth());
app.set("view engine","ejs")
app.set("views", Path.resolve("./views"));

app.use("/user", userRouter);
app.use("/interview", interviewRouter);
app.get("/", (req,res) => {
    const user = req.user;
    if(!user){
        return res.redirect("/user/login");
    }
    return res.sendFile(require("path").resolve("./views/preparation.html"), {
        user
    });
});

app.get("/api/current-user", (req, res) => {
    const user = req.user;
    res.json(user);
});

/*app.get("/fetch",async (req,res) => {
    console.log("FETCH API HIT");
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
    const savedAttempt = await attempt.save();
    await savedAttempt.populate("questions", "question");
    return res.json(savedAttempt.questions);
});*/


app.post("/questionBank", async (req,res) => {
    const {question,role,difficulty} = req.body;
    var {tags} = req.body;
    const lastQuestion = await Question.findOne({
    role,
    difficulty
    }).sort({ order: -1 });
    const nextOrder = lastQuestion ? lastQuestion.order + 1 : 1;
    tags = tags.map(tag => tag.toLowerCase().trim());
    tags = [...new Set(tags)];
    const ask = await Question.create({
        question,
        role,
        order: nextOrder,
        tags
    });
    return res.send("Success!");
})

app.listen(process.env.PORT, () => {
    console.log("Server Started");
});