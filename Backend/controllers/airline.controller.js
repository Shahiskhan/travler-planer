const { Airline } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const airlines = await Airline.findAll();
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
        const airline = await Airline.create(req.body);
        res.status(201).json(airline);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const airline = await Airline.findByPk(req.params.id);
        if (!airline) return res.status(404).json({ message: "Airline not found" });
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
        await airline.destroy();
        res.json({ message: "Airline deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
