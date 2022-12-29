// Users Router
const express = require("express");
const usersController = require("../../controllers/users.controller");

// path userRouters: /api/v1/users
const userRouters = express.Router();

// userRouters.get("", usersController.get());
userRouters.get("/:id?", usersController.get());
userRouters.post("", usersController.create());
userRouters.delete("/:id", usersController.delete());
userRouters.put("/:id", usersController.update());

module.exports = userRouters;
