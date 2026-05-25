const express = require("express");
const leaderBoardRouter = express.Router();
const {handleGetLeaderBoard} = require("../controllers/leaderboard")
leaderBoardRouter.get("/", handleGetLeaderBoard);

module.exports = leaderBoardRouter;