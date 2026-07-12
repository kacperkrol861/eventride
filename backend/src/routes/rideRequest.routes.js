const express = require("express");

const {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest
} = require("../controllers/rideRequest.controller");

const authMiddleware = require("../middleware/auth.middleware");


const router = express.Router();


router.post(
    "/rides/:id/request",
    authMiddleware,
    createRequest
);

router.get(
    "/rides/:id/requests",
    authMiddleware,
    getRequests
);

router.patch(
    "/requests/:id/accept",
    authMiddleware,
    acceptRequest
);


router.patch(
    "/requests/:id/reject",
    authMiddleware,
    rejectRequest
);


module.exports = router;