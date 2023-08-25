const express = require("express");
const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
  getFoodDetails
} = require("../controllers/foodController");
const {
  authToAdmin,
  isAuthenticatedUser,
  authToRegularUser,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/foods").get(getAllFoods);
router
  .route("/foods/new")
  .post(isAuthenticatedUser, authToAdmin, createFood);
router
  .route("/food/:foodId")
  .get(getFoodDetails)
  .put(isAuthenticatedUser, authToAdmin, updateFood)
  .delete(isAuthenticatedUser, authToAdmin, deleteFood);

module.exports = router;
