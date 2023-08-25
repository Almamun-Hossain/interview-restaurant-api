const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is missing"],
    },
    country: {
      type: String,
      required: [true, "Restaurant country is missing"],
    },
    address: {
      type: String,
      required: [true, "Restaurant address is missing"],
    },
    availivility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

restaurantSchema.plugin(toJSON);

module.exports = mongoose.model("Restaurant", restaurantSchema);
