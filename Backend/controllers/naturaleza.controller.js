const models = require("../models");


exports.getAllNaturalezas = async (req, res) => {
    try {
        const naturalezas = await models.Naturalezas.findAll();
        if (!naturalezas || naturalezas.length === 0) {
            return res.status(404).json({ message: "No se encontraron naturalezas" });
        }
        res.json(naturalezas);
    } catch (error) {
        console.error("Error al obtener las naturalezas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }


}
