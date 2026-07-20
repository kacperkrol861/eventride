const express = require("express");

const {
    createEvent,
    getEvents,
    deleteEvent,
    getMyEvents
} = require("../controllers/event.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createEventSchema
} = require("../validators/event.validator");

const router = express.Router();



router.post(
    "/",
    authMiddleware,
    validate(createEventSchema),
    createEvent,
    getMyEvents
);


router.get(
    "/",
    getEvents
);

router.delete(
    "/:id",
    authMiddleware,
    deleteEvent
);

router.get(
    "/my-events",
    authMiddleware,
    getMyEvents
);

module.exports = router;