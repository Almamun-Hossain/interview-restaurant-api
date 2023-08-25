const Restarant = require("../models/restaurantModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const ApiFeature = require("../utils/apiFeature");
const Food = require("../models/foodModel");

/**
 * Create Restaurant
 * Perform by Admin
 */
exports.createRestaurant = handleAsyncError(async (req, res, next) => {
  const restaurant = await Restarant.create(req.body);
  res.status(201).json({
    success: true,
    message: "Restaurant added successfully!",
    restaurant,
  });
});

/**
 * Get All Restaurants
 * Perform by all users
 */
exports.getAllRestaurant = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const apiFeature = new ApiFeature(Restarant.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const restaurants = await apiFeature.query;

  res.status(200).json({ success: true, restaurants });
});

/**
 * Get Single Restaurant Details
 * Access by all user
 * not authenticated
 */

exports.getRestaurantFoods = handleAsyncError(async (req, res, next) => {
  let restaurant = await Restarant.findById(req.params.id);
  if (!restaurant) return next(new ErrorHandler("Restaurant not found", 404));

  let foods = await Food.find({ restaurant: req.params.id });

  res.status(200).json({ success: true, restaurant, foods });
});

/**
 * Update Restaurant
 * Perform by Admin
 */

exports.updateRestaurant = handleAsyncError(async (req, res, next) => {
  let restaurant = await Restarant.findById(req.params.id);
  if (!restaurant) return next(new ErrorHandler("Restaurant not found", 404));

  restaurant = await Restarant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, restaurant });
});

/**
 * Delete Restaurant
 * Perform by Admin
 */
exports.deleteRestaurant = handleAsyncError(async (req, res, next) => {
  const restaurant = await Restarant.findById(req.params.id);

  if (!restaurant) return next(new ErrorHandler("Restaurant not found", 404));

  await restaurant.deleteOne({ _id: req.params.id });

  res
    .status(200)
    .json({ success: true, message: "Restaurant deleted successfully" });
});
