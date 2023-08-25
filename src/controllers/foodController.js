const Food = require("../models/foodModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const ApiFeature = require("../utils/apiFeature");

/**
 * Create food
 * Perform by Admin
 */
exports.createFood = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const food = await Food.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Food added successfully!", food });
});

/**
 * Get All Foods
 * Perform by all users
 */
exports.getAllFoods = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const apiFeature = new ApiFeature(Food.find().populate('restaurant'), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const foods = await apiFeature.query;

  res.status(200).json({ success: true, foods });
});

/**
 * Get Single Food Details
 * Access by all user
 * not authenticated
 */

exports.getFoodDetails = handleAsyncError(async (req, res, next) => {
  let food = await Food.findById(req.params.foodId).populate('restaurant');
  if (!food) return next(new ErrorHandler("Food not found", 404));

  res.status(200).json({ success: true, food });
});

/**
 * Update Food
 * Perform by Admin
 */

exports.updateFood = handleAsyncError(async (req, res, next) => {
  let food = await Food.findById(req.params.foodId);
  if (!food) return next(new ErrorHandler("Food not found", 404));

  food = await Food.findByIdAndUpdate(req.params.foodId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, food });
});

/**
 * Delete Food
 * Perform by Admin
 */
exports.deleteFood = handleAsyncError(async (req, res, next) => {
  const food = await Food.findById(req.params.foodId);

  if (!food) return next(new ErrorHandler("Food not found", 404));

  await food.deleteOne({ _id: req.params.foodId });

  res
    .status(200)
    .json({ success: true, message: "Food delete successfully" });
});
