const logger = require("morgan");
const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");

const errorMiddleware = require("../middleware/error");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const foodRoute = require("../routes/foodRoute");
const userRoute = require("../routes/userRoute");
const restaurantRoute = require("../routes/restaurantRoute");
const searchRoute = require("../routes/searchRoute");
const reservationRoute = require("../routes/reservationRoute");
//cors options
const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "http://127.0.0.1"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

//pre-configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

//router
const router = express.Router();

router.get("/api/v1/", (req, res, next) => {
  res.send("Hurrah You appliation is running");
});
app.use("/api/v1/", foodRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", restaurantRoute);
app.use("/api/v1/", searchRoute);
app.use("/api/v1/", reservationRoute);

//error handling
app.use(errorMiddleware);

module.exports = app;
