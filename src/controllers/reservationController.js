const handleAsyncError = require("../middleware/handleAsyncError");
const Reservation = require("../models/reservationModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../utils/sendEmail");

// Create a new reservation
exports.createReservation = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const reservation = await Reservation.create(req.body);

  const message = `Hi ${req.user.name}, \n\n You just requested for a Reservation. This is a confiramtion email is that your seat has been booked successfully.
  \n\n If you didn't request this email, please ignore it.`;

  try {
    await sendEmail({
      email: req.user.email,
      subject: "Reservation Confirmed!",
      message: message,
    });
    res
      .status(201)
      .json({ success: true, message: "Reservation Confirmed!", reservation });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
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

  const message = `Hi ${req.user.name}, \n\n  This is a confiramtion email is that your reservation has been canceled successfully.
  \n\n Sorry to see you go. Hope we will see in future.`;

  try {
    await sendEmail({
      email: req.user.email,
      subject: "Reservation Canceled!",
      message: message,
    });
    res
      .status(201)
      .json({ success: true, message: "Reservation canceled successfully" });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});
