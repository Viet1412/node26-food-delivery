const express = require("express");
const authController = require("../../controllers/auth.controller");

const authRouters = express.Router();

authRouters.post("", authController.login());
authRouters.get("", authController.getProfile());

module.exports = authRouters;
