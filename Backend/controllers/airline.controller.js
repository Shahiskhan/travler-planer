const { Airline } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const where = userId ? { UserId: userId } : {};
        const airlines = await Airline.findAll({ where });
        res.json(airlines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const airline = await Airline.findByPk(req.params.id);
        if (!airline) return res.status(404).json({ message: "Airline not found" });
        res.json(airline);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const airline = await Airline.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json(airline);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const airline = await Airline.findByPk(req.params.id);
        if (!airline) return res.status(404).json({ message: "Airline not found" });

        if (req.user.role !== 'ADMIN' && airline.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this airline" });
        }

        await airline.update(req.body);
        res.json(airline);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const airline = await Airline.findByPk(req.params.id);
        if (!airline) return res.status(404).json({ message: "Airline not found" });

        if (req.user.role !== 'ADMIN' && airline.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this airline" });
        }

        await airline.destroy();
        res.json({ message: "Airline deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
