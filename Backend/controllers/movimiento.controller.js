const models = require("../models");


exports.getAllMovimientos = async (req, res) => {
    try {
        const movimientos = await models.Movimientos.findAll();
        if (!movimientos || movimientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron movimientos" });
        }
        res.json(movimientos);
    } catch (error) {
        console.error("Error al obtener los movimientos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }


}
