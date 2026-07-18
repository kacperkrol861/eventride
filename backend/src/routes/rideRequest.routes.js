const express = require("express");

const {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest,
    getMyRequests,
    getMyRideRequests
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





router.get(
    "/my-requests",
    authMiddleware,
    getMyRequests
);

router.get(
    "/my-ride-requests",
    authMiddleware,
    getMyRideRequests
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