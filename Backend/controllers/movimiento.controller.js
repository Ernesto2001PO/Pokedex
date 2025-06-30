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
exports.aprenderMovimientoPokemon = async (req, res) => {
    try {
        const { id_pokemon, id_movimiento } = req.body;

        if (!id_pokemon || !id_movimiento) {
            return res.status(400).json({ message: "Faltan datos necesarios para aprender el movimiento" });
        }

        const pokemon = await models.Pokemon.findByPk(id_pokemon);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado" });
        }

        const movimiento = await models.Movimientos.findByPk(id_movimiento);
        if (!movimiento) {
            return res.status(404).json({ message: "Movimiento no encontrado" });
        }

        const yaAsignado = await models.PokemonAprenderMovimiento.findOne({
            where: { id_movimiento }
        });
        if (yaAsignado) {
            return res.status(409).json({ message: "Este movimiento ya está asignado a otro Pokémon" });
        }

        await models.PokemonAprenderMovimiento.create({ id_pokemon, id_movimiento });

        res.status(201).json({ message: "Movimiento aprendido correctamente" });
    } catch (error) {
        console.error("Error al aprender el movimiento:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

