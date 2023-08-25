const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const reservationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurant",
    },
    reserveDate: {
      type: Date,
      required: true,
    },
    reserveTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

reservationSchema.plugin(toJSON);

module.exports = mongoose.model("Reservation", reservationSchema);
