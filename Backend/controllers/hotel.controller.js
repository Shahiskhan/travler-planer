const { Hotel } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const where = userId ? { UserId: userId } : {};
        const hotels = await Hotel.findAll({ where });
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
        const hotel = await Hotel.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });

        if (req.user.role !== 'ADMIN' && hotel.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this hotel" });
        }

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

        if (req.user.role !== 'ADMIN' && hotel.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this hotel" });
        }

        await hotel.destroy();
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
