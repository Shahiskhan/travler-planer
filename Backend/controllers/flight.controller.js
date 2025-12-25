const { Flight } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const where = userId ? { UserId: userId } : {};
        const flights = await Flight.findAll({ where });
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: "Flight not found" });
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const flight = await Flight.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: "Flight not found" });

        if (req.user.role !== 'ADMIN' && flight.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this flight" });
        }

        await flight.update(req.body);
        res.json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: "Flight not found" });

        if (req.user.role !== 'ADMIN' && flight.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this flight" });
        }

        await flight.destroy();
        res.json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
