const express = require("express");

const {
    createRide,
    getRides
} = require("../controllers/ride.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createRideSchema
} = require("../validators/ride.validator");

const router = express.Router();


router.post(
    "/",
    authMiddleware,
    validate(createRideSchema),
    createRide
);

router.get(
    "/",
    getRides
);


module.exports = router;