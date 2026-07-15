const express = require("express");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const eventRoutes = require("./routes/event.routes");
const rideRoutes = require("./routes/ride.routes");
const rideRequestRoutes = require("./routes/rideRequest.routes");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api", rideRequestRoutes);


module.exports = app;