// restaurants Router
const express = require("express");
const restaurantsController = require("../../controllers/restaurants.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requiredRole");

const restaurantRouters = express.Router();

restaurantRouters.get("/:id?", restaurantsController.get());
restaurantRouters.post("", authorization, restaurantsController.create());
restaurantRouters.delete("/:id", authorization, requiredRole('merchant', 'admin'), restaurantsController.delete());
// restaurantRouters.put("/:id", restaurantsController.update());
restaurantRouters.post("/:restaurantId/like", restaurantsController.likeRestaurant());


module.exports = restaurantRouters;
