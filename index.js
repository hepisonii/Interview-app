require("dotenv").config();
const express = require("express");
const app = express();
const {connectMongoDB} = require("./connections/connect");
const Path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/auth");
const userRouter = require("./routes/user");

connectMongoDB(process.env.MONGODB_URL);

app.set(Path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth());


app.use("/user", userRouter);
app.get("/", (req,res) => {
    return res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log("Server Started");
});