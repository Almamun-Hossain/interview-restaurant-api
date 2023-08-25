const express = require("express");
const {
  getAllRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantFoods,
} = require("../controllers/restaurantController");
const {
  authToAdmin,
  isAuthenticatedUser,
  authToRegularUser,
} = require("../middleware/authentication");
const foodModel = require("../models/foodModel");

const router = express.Router();

router.route("/restaurants").get(getAllRestaurant);
router
  .route("/restaurants/new")
  .post(isAuthenticatedUser, authToAdmin, createRestaurant);

router
  .route("/restaurant/:id")
  .get(getRestaurantFoods)
  .put(isAuthenticatedUser, authToAdmin, updateRestaurant)
  .delete(isAuthenticatedUser, authToAdmin, deleteRestaurant);
module.exports = router;
