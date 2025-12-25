const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status !== "ACTIVE") {
            return res.status(403).json({ message: "User account is suspended" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

const miniAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "ADMIN" && req.user.role !== "MINI_ADMIN") {
        return res.status(403).json({ message: "Admin or Mini-Admin access required" });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware, miniAdminMiddleware };
