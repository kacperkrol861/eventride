const express = require("express");

const {
    createEvent,
    getEvents,
    deleteEvent
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
    createEvent
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

module.exports = router;