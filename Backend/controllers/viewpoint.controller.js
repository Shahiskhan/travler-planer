const { ViewPoint } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const viewpoints = await ViewPoint.findAll();
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
        const viewpoint = await ViewPoint.create(req.body);
        res.status(201).json(viewpoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const viewpoint = await ViewPoint.findByPk(req.params.id);
        if (!viewpoint) return res.status(404).json({ message: "ViewPoint not found" });
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
        await viewpoint.destroy();
        res.json({ message: "ViewPoint deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
