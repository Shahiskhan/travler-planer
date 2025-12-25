const { ViewPoint } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const where = userId ? { UserId: userId } : {};
        const viewpoints = await ViewPoint.findAll({ where });
        res.json(viewpoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const viewpoint = await ViewPoint.findByPk(req.params.id);
        if (!viewpoint) return res.status(404).json({ message: "ViewPoint not found" });
        res.json(viewpoint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const viewpoint = await ViewPoint.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json(viewpoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const viewpoint = await ViewPoint.findByPk(req.params.id);
        if (!viewpoint) return res.status(404).json({ message: "ViewPoint not found" });

        if (req.user.role !== 'ADMIN' && viewpoint.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this viewpoint" });
        }

        await viewpoint.update(req.body);
        res.json(viewpoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const viewpoint = await ViewPoint.findByPk(req.params.id);
        if (!viewpoint) return res.status(404).json({ message: "ViewPoint not found" });

        if (req.user.role !== 'ADMIN' && viewpoint.UserId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You don't own this viewpoint" });
        }

        await viewpoint.destroy();
        res.json({ message: "ViewPoint deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
