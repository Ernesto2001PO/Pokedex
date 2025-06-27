const models = require("../models");

exports.getAllTipos = async (req, res) => {
    try {
        const tipos = await models.PokemonTipos.findAll();
        if (!tipos || tipos.length === 0) {
            return res.status(404).json({ message: "No se encontraron tipos" });
        }
        res.json(tipos);
    } catch (error) {
        console.error("Error al obtener los tipos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};