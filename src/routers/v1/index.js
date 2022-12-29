// Routers V1
const express = require("express");
const authorization = require("../../middlewares/authorization");
const authRouters = require("./auth.router");
const restaurantRouters = require("./restaurants.router");
const userRouters = require("./users.router");
const uploadController = require("../../controllers/upload.controller");
const upload = require("../../middlewares/upload");

// path v1: /api/v1
const v1 = express.Router();

v1.use("/users", userRouters);
v1.use("/restaurants", restaurantRouters);

v1.use("/login", authRouters);
v1.use("/auth", authorization, authRouters);


// Định nghĩa router cho upload
v1.post("/upload", upload.single('file'), uploadController.upload())


module.exports = v1;
