const express = require("express");
const statsRouter = express.Router();
const {handleGetStats} = require("../controllers/userStats");
const path = require("path");
statsRouter.get("/:id/fetch", handleGetStats);
statsRouter.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/userstats.html"));
});

module.exports = statsRouter;