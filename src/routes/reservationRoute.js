const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const {
  isAuthenticatedUser,
  authToRegularUser,
} = require("../middleware/authentication");

// Create a reservation
router
  .route("/reservations")
  .get(isAuthenticatedUser, getAllReservations)
  .post(isAuthenticatedUser, authToRegularUser, createReservation);

// Get all reservations
router // Get a reservation by ID
  .route("/reservation/:id")
  .get(isAuthenticatedUser, getReservationById)
  .put(isAuthenticatedUser, updateReservation)
  .delete(isAuthenticatedUser, deleteReservation);

module.exports = router;
