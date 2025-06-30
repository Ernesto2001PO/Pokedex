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
                },
                {
                    model: models.Movimientos,
                    as: 'movimientosAprendibles',
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

exports.createPokemon = async (req, res) => {
    try {
        const { nombre, base_hp, base_attack, base_defense, base_speed, base_speedAtk, base_speedDef, habilidad1, habilidad2, habilidad_oculta } = req.body;
        const img_url = req.file ? req.file.path : null;

        if (!nombre || !base_hp || !base_attack || !base_defense || !base_speed || !img_url) {
            return res.status(400).json({ message: "Faltan datos necesarios para crear el Pokémon" });
        }

        const newPokemon = await models.Pokemon.create({
            nombre,
            base_hp,
            base_attack,
            base_defense,
            base_speed,
            base_speedAtk,
            base_speedDef,
            img_url,
            habilidad1,
            habilidad2,
            habilidad_oculta
        });

        res.status(201).json(newPokemon);
    } catch (error) {
        console.error("Error al crear el Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}


exports.updatePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, base_hp, base_attack, base_defense, base_speed, base_speedAtk, base_speedDef, habilidad1, habilidad2, habilidad_oculta } = req.body;

        let img_url = req.file ? req.file.path : req.body.img_url;

        const pokemon = await models.Pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado" });
        }

        await pokemon.update({
            nombre,
            base_hp,
            base_attack,
            base_defense,
            base_speed,
            base_speedAtk,
            base_speedDef,
            img_url,
            habilidad1,
            habilidad2,
            habilidad_oculta
        });

        res.json(pokemon);
    } catch (error) {
        console.error("Error al actualizar el Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.deletePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await models.Pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado" });
        }

        await pokemon.destroy();
        res.json({ message: "Pokémon eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}