const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false)
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`,
      {
        dbName: "FoodStore",
      }
    )
    .then(() => {
      console.log("database connected with atlas mongodb");
    });
};
module.exports = connectDatabase;
