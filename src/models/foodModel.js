const mongoose = require("mongoose");
const slugify = require("slugify");
const toJSON = require("./plugins/toJSON.plugin");
const foodSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Food Title"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: function genSlug() {
        return slugify(this.title.toLowerCase());
      },
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLenght: [8, "Price cannot exceed 8 characters"],
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide image url"],
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurant",
      required: [true, "Please select a restaurant"],
    },
  },
  { timestamps: true }
);

foodSchema.plugin(toJSON);

module.exports = mongoose.model("Food", foodSchema);
