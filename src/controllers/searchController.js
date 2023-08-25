const Food = require("../models/foodModel"); // Import your Food model
const Restaurant = require("../models/restaurantModel"); // Import your Restaurant model

exports.searchFood = async (req, res) => {
  const { shop, food, country, address } = req.query;

  try {
    const foodQuery = {};

    if (shop || country || address) {
      const restaurantQuery = {};

      if (shop) {
        restaurantQuery.name = { $regex: new RegExp(shop, "i") };
      }

      if (country) {
        restaurantQuery.country = { $regex: new RegExp(country, "i") };
      }
        if (address) {
          restaurantQuery.address = { $regex: new RegExp(address, "i") };
        }

      const restaurants = await Restaurant.find(restaurantQuery);
      const restaurantIds = restaurants.map((restaurant) => restaurant.id);

      foodQuery.restaurant = { $in: restaurantIds };
    }

    if (food) {
      foodQuery.title = { $regex: new RegExp(food, "i") };
    }
    const foods = await Food.find(foodQuery).populate("restaurant");

    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to find restaurant IDs based on the search query
async function findRestaurantsByQuery(query) {
  const restaurantIds = [];

  try {
    // Search for restaurants based on name, address, and country
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });

    // Extract restaurant IDs
    restaurants.forEach((restaurant) => {
      restaurantIds.push(restaurant.id);
    });

    return restaurantIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
