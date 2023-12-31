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
  origin: [
    "*.verce.app",
    "*.netlify.app",
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://restaurant-frontend-chi.vercel.app",
    "https://main--endearing-babka-770e34.netlify.app",
    "https://restaurant-frontend-nine.vercel.app",
    "https://endearing-babka-770e34.netlify.app/",
  ],
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
app.use("/api/v1/", foodRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", restaurantRoute);
app.use("/api/v1/", searchRoute);
app.use("/api/v1/", reservationRoute);

//error handling
app.use(errorMiddleware);

module.exports = app;
