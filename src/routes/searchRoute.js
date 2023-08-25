const express = require("express");

const { searchFood } = require("../controllers/searchController");
const router = express.Router();
// Define a search route
router.get("/search", searchFood);

module.exports = router;
