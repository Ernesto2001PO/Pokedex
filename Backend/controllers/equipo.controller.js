const models = require("../models");


exports.getAllTeamsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const equipos = await models.Equipos.findAll({
            where: { usuario_id: id },
            include: [
                {
                    model: models.Pokemon_en_equipo,
                    as: "pokemones_en_equipo",
                    include: [
                        {
                            model: models.Pokemon,
                            as: "pokemon",
                            attributes: ["nombre"]
                        }
                    ]
                }
            ],
        });
        if (!equipos || equipos.length === 0) {
            return res.status(404).json({ message: "No se encontraron equipos para este usuario" });
        }
        // Solo nombre del equipo y nombres de los pokémon
        const equiposConPokemones = equipos.map(equipo => ({
            nombre_equipo: equipo.nombre,
            id: equipo.id,
            pokemones: equipo.pokemones_en_equipo.map(pe => pe.pokemon?.nombre)
        }));
        res.json(equiposConPokemones);
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await models.Equipos.findByPk(id, {
            include: [
                {
                    model: models.Pokemon_en_equipo,
                    as: "pokemones_en_equipo",
                    include: [
                        {
                            model: models.Pokemon,
                            as: "pokemon",
                            attributes: ["nombre"]
                        }
                    ]
                }
            ],
        });
        if (!equipo) {
            return res.status(404).json({ message: "Equipo no encontrado" });
        }
        const equipoConPokemones = {
            nombre_equipo: equipo.nombre,
            id: equipo.id,
            pokemones: equipo.pokemones_en_equipo.map(pe => pe.pokemon?.nombre)
        };
        res.json(equipoConPokemones);
    } catch (error) {
        console.error("Error al obtener el equipo:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}









exports.createTeam = async (req, res) => {
    try {
        const { nombre, usuario_id } = req.body;

        // Verificar si el equipo ya existe
        const existingTeam = await models.Equipos.findOne({ where: { nombre, usuario_id } });
        if (existingTeam) {
            return res.status(400).json({ message: "El equipo ya existe" });
        }
        // Crear el nuevo equipo
        const nuevoEquipo = await models.Equipos.create({
            nombre,
            usuario_id,
        });
        res.status(201).json({
            message: "Equipo creado exitosamente",
            equipo: nuevoEquipo,
        });
    } catch (error) {
        console.error("Error al crear el equipo:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }

};



exports.addPokemonToTeam = async (req, res) => {
    try {
        const { equipo_id } = req.params;
        const {
            pokemon_id,
            slot_number,
            apodo,
            items_id, 
            habilidad,
            naturaleza_id,
            ev_hp, ev_atk, ev_def, ev_spatk, ev_spdef, ev_speed,
            iv_hp, iv_atk, iv_def, iv_spatk, iv_spdef, iv_speed,
            movimiento1_id, movimiento2_id, movimiento3_id, movimiento4_id
        } = req.body;

        // 1. Validar que el equipo exista
        const team = await models.Equipos.findByPk(equipo_id);
        if (!team) {
            return res.status(404).json({ message: "Equipo no encontrado." });
        }

        // 2. Validar que el Pokémon (especie) exista
        const pokemonSpecies = await models.Pokemon.findByPk(pokemon_id);
        if (!pokemonSpecies) {
            return res.status(404).json({ message: "Especie de Pokémon no encontrada." });
        }

        // 3. Validar límite de 6 Pokémon por equipo
        const currentPokemonsInTeam = await models.Pokemon_en_equipo.count({
            where: { equipo_id }
        });
        if (currentPokemonsInTeam >= 6) {
            return res.status(400).json({ message: "El equipo ya tiene el máximo de 6 Pokémon." });
        }

        // 4. Validar que el ítem, naturaleza y movimientos existan si se proporcionan
        if (items_id) {
            const item = await models.Items.findByPk(items_id);
            if (!item) return res.status(400).json({ message: "ID de ítem inválido." });
        }
        if (naturaleza_id) {
            const naturaleza = await models.Naturalezas.findByPk(naturaleza_id);
            if (!naturaleza) return res.status(400).json({ message: "ID de naturaleza inválido." });
        }
        // Validación de movimientos (opcional)
        for (const movId of [movimiento1_id, movimiento2_id, movimiento3_id, movimiento4_id]) {
            if (movId) {
                const mov = await models.Movimientos.findByPk(movId);
                if (!mov) return res.status(400).json({ message: `ID de movimiento inválido: ${movId}` });
            }
        }

        // 5. Crear el nuevo registro de Pokémon en el equipo
        const newPokemonEnEquipo = await models.Pokemon_en_equipo.create({
            equipo_id,
            pokemon_id,
            slot_number,
            apodo,
            items_id,
            habilidad,
            naturaleza_id,
            ev_hp, ev_atk, ev_def, ev_spatk, ev_spdef, ev_speed,
            iv_hp, iv_atk, iv_def, iv_spatk, iv_spdef, iv_speed,
            movimiento1_id, movimiento2_id, movimiento3_id, movimiento4_id
        });

        res.status(201).json({
            message: "Pokémon agregado al equipo exitosamente.",
            pokemon: newPokemonEnEquipo
        });

    } catch (error) {
        console.error("Error al agregar Pokémon al equipo:", error);
        return res.status(500).json({ message: "Error interno del servidor al agregar Pokémon." });
    }
};