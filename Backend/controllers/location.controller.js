const { Location } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const where = userId ? { UserId: userId } : {};
        const locations = await Location.findAll({ where });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const location = await Location.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });

        // Authorization check: Super Admin or Owner
        if (req.user.role !== 'ADMIN' && location.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this location" });
        }

        await location.update(req.body);
        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });

        // Authorization check: Super Admin or Owner
        if (req.user.role !== 'ADMIN' && location.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this location" });
        }

        await location.destroy();
        res.json({ message: "Location deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
