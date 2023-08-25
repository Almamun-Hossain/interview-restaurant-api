const handleAsyncError = require("../middleware/handleAsyncError");
const Reservation = require("../models/reservationModel");
const userModel = require("../models/userModel");

// Create a new reservation
exports.createReservation = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const reservation = await Reservation.create(req.body);
  res.status(201).json(reservation);
});

// Get all reservations
exports.getAllReservations = handleAsyncError(async (req, res, next) => {
  let reservations = [];
  let user = await userModel.findById(req.user.id);
  if (user.isAdmin) {
    reservations = await Reservation.find()
      .populate("user")
      .populate("restaurant");
  } else {
    reservations = await Reservation.find({ user: req.user.id }).populate(
      "restaurant"
    );
  }

  res.json(reservations);
});

// Get a single reservation by ID
exports.getReservationById = handleAsyncError(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }
  res.json(reservation);
});

// Update a reservation by ID
exports.updateReservation = handleAsyncError(async (req, res, next) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }
  res.json(reservation);
});

// Delete a reservation by ID
exports.deleteReservation = handleAsyncError(async (req, res, next) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }
  res.json({ message: "Reservation deleted successfully" });
});
