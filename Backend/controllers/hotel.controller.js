const { Hotel } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        await hotel.update(req.body);
        res.json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        await hotel.destroy();
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
