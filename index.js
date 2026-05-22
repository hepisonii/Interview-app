require("dotenv").config();
const express = require("express");
const app = express();
const {connectMongoDB} = require("./connections/connect");
const Path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const Question = require("./models/questionBank")
connectMongoDB(process.env.MONGODB_URL);

app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth());
app.set("view engine","ejs")
app.set("views", Path.resolve("./views"));

app.use("/user", userRouter);
app.get("/", (req,res) => {
    const user = req.user;
    if(!user){
        return res.redirect("/user/login");
    }
    return res.sendFile(require("path").resolve("./views/dashboard.html"), {
        user
    });
});

app.get("/api/current-user", (req, res) => {
    const user = req.user;
    res.json(user);
});

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