const express = require("express");
const settingsRouter = express.Router();
const {handleGetSettings, handlePostSettings} = require("../controllers/settings");
const {cloudinary,upload} = require("../cloudConfig")

settingsRouter.get("/", handleGetSettings);
settingsRouter.post("/",upload.single("profileImage"), handlePostSettings);

module.exports = settingsRouter;