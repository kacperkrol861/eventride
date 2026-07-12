const express = require("express");

const {
    createRide,
    getRides
} = require("../controllers/ride.controller");

const authMiddleware = require("../middleware/auth.middleware");


const router = express.Router();


router.post(
    "/",
    authMiddleware,
    createRide
);


router.get(
    "/",
    getRides
);


module.exports = router;