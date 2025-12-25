const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
require('dotenv').config();

const authRoutes = require("./routes/auth.routes");
const apiRoutes = require("./routes/api.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Trave Management System Backend is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Sync DB & Start Server
// Use { alter: true } only during development to update tables
sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected and synced.");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});
