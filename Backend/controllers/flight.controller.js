const { Flight } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const flights = await Flight.findAll();
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
        const flight = await Flight.create(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (!flight) return res.status(404).json({ message: "Flight not found" });
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
        await flight.destroy();
        res.json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
