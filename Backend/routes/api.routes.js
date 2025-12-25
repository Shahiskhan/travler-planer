const express = require("express");
const router = express.Router();
const { authMiddleware, miniAdminMiddleware } = require("../middleware/auth.middleware");

// Controllers
const locationController = require("../controllers/location.controller");
const viewpointController = require("../controllers/viewpoint.controller");
const hotelController = require("../controllers/hotel.controller");
const flightController = require("../controllers/flight.controller");
const airlineController = require("../controllers/airline.controller");

// Location Routes
router.get("/locations", locationController.getAll);
router.get("/locations/:id", locationController.getOne);
router.post("/locations", authMiddleware, miniAdminMiddleware, locationController.create);
router.put("/locations/:id", authMiddleware, miniAdminMiddleware, locationController.update);
router.delete("/locations/:id", authMiddleware, miniAdminMiddleware, locationController.delete);

// ViewPoint Routes
router.get("/viewpoints", viewpointController.getAll);
router.get("/viewpoints/:id", viewpointController.getOne);
router.post("/viewpoints", authMiddleware, miniAdminMiddleware, viewpointController.create);
router.put("/viewpoints/:id", authMiddleware, miniAdminMiddleware, viewpointController.update);
router.delete("/viewpoints/:id", authMiddleware, miniAdminMiddleware, viewpointController.delete);

// Hotel Routes
router.get("/hotels", hotelController.getAll);
router.get("/hotels/:id", hotelController.getOne);
router.post("/hotels", authMiddleware, miniAdminMiddleware, hotelController.create);
router.put("/hotels/:id", authMiddleware, miniAdminMiddleware, hotelController.update);
router.delete("/hotels/:id", authMiddleware, miniAdminMiddleware, hotelController.delete);

// Flight Routes
router.get("/flights", flightController.getAll);
router.get("/flights/:id", flightController.getOne);
router.post("/flights", authMiddleware, miniAdminMiddleware, flightController.create);
router.put("/flights/:id", authMiddleware, miniAdminMiddleware, flightController.update);
router.delete("/flights/:id", authMiddleware, miniAdminMiddleware, flightController.delete);

// Airline Routes
router.get("/airlines", airlineController.getAll);
router.get("/airlines/:id", airlineController.getOne);
router.post("/airlines", authMiddleware, miniAdminMiddleware, airlineController.create);
router.put("/airlines/:id", authMiddleware, miniAdminMiddleware, airlineController.update);
router.delete("/airlines/:id", authMiddleware, miniAdminMiddleware, airlineController.delete);

module.exports = router;
