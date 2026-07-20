const express = require("express");
const { register, login, getAccountStatistics } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const {registerSchema} = require("../validators/auth.validator");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();


router.post(
    "/register",
    validate(registerSchema),
    register
);
router.post("/login", login);
router.get(
    "/account/statistics",
    authMiddleware,
    getAccountStatistics
);
module.exports = router;