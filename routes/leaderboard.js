const express = require("express");
const leaderBoardRouter = express.Router();
const {handleGetLeaderBoard} = require("../controllers/leaderboard")
leaderBoardRouter.get("/", handleGetLeaderBoard);

leaderBoardRouter.get("/display", (req,res) => {
    return res.sendFile(require("path").resolve("./views/leaderboard.html"))
})

module.exports = leaderBoardRouter;