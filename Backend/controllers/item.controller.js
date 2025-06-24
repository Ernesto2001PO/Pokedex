const models = require("../models");


exports.getAllItems = async (req, res) => {
    try {
        const items = await models.Items.findAll();
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No se encontraron items" });
        }
        res.json(items);
    } catch (error) {
        console.error("Error al obtener los items:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }


}
