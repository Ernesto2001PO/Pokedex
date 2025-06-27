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

exports.getMovimientoByPokemonId = async (req, res) => {
    try {
        const { id } = req.params;
        const movimientos = await models.Movimientos.findAll({ where: { pokemon_id: id } });
        if (!movimientos || movimientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron movimientos para este Pokémon" });
        }
        res.json(movimientos);
    } catch (error) {
        console.error("Error al obtener los movimientos del Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

