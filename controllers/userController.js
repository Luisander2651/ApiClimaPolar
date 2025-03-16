const userModel = require("../models/User");

const userController = {
    register: async (req, res) => {
        try {
            const result = await userModel.createUser(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await userModel.getAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const result = await userModel.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await userModel.updateUser(id, req.body);

            if (result.user) {
                res.status(200).json(result.user);
            } else {
                res.status(400).json({ error: result.error });
            }
        } catch (error) {
            res.status(500).json({ error: "No se pudo actualizar el usuario", mensage: error.message });
        }
    }
}

module.exports = userController;