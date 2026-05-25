const express = require("express");
const statsRouter = express.Router();
const {handleGetStats} = require("../controllers/userStats");

statsRouter.get("/:id/fetch", handleGetStats);
statsRouter.get("/:id", (req,res) => {
    return res.sendFile(require("path").resolve("./views/userStats.html"))
})

module.exports = statsRouter;