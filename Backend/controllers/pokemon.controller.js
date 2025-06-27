const models = require("../models");

exports.getAllPokemon = async (req, res) => {
    try {
        const pokemon = await models.Pokemon.findAll({
            include: [
                {
                    model: models.PokemonTipos,
                    as: 'tipos',
                    through: { attributes: [] }
                }
            ],
            
        });
        res.json(pokemon);
        
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await models.Pokemon.findByPk(id, {
            include: [
                {
                    model: models.PokemonTipos,
                    as: 'tipos',
                    through: { attributes: [] }
                }
            ],
        });
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado" });
        }
        res.json(pokemon);
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}