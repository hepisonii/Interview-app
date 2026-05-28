const express = require("express");
const leaderBoardRouter = express.Router();
const {handleGetLeaderBoard} = require("../controllers/leaderboard")
leaderBoardRouter.get("/", handleGetLeaderBoard);
const path = require("path");

leaderBoardRouter.get("/display", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/leaderboard.html"));
});

module.exports = leaderBoardRouter;