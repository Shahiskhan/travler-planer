const { Location } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const locations = await Location.findAll();
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
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });
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
        await location.destroy();
        res.json({ message: "Location deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
