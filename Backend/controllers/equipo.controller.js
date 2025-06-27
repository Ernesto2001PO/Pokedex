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
                            attributes: ["nombre", "img_url"]
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
            pokemones: equipo.pokemones_en_equipo.map(pe => ({ id: pe.id, nombre: pe.apodo, img_url: pe.pokemon?.img_url }))
        };
        res.json(equipoConPokemones);
    } catch (error) {
        console.error("Error al obtener el equipo:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.pokemonInTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonEnEquipo = await models.Pokemon_en_equipo.findByPk(id, {
            include: [
                {
                    model: models.Pokemon,
                    as: "pokemon",
                    attributes: ["id_pokemon", "nombre", "img_url", "habilidad1", "habilidad2", "habilidad_oculta"],
                    include: [
                        {
                            model: models.PokemonTipos,
                            as: "tipos",
                            attributes: ["id_tipo", "nombre"],
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: models.Items,
                    as: "item",
                    attributes: ["id", "nombre"]
                },
                {
                    model: models.Naturalezas,
                    as: "naturaleza",
                    attributes: ["id", "nombre"]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento1",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento2",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento3",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento4",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento1",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"],
                    include: [
                        {
                            model: models.PokemonTipos,
                            as: "tipo",
                            attributes: ["id_tipo", "nombre"]
                        }
                    ]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento2",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"],
                    include: [
                        {
                            model: models.PokemonTipos,
                            as: "tipo",
                            attributes: ["id_tipo", "nombre"]
                        }
                    ]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento3",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"],
                    include: [
                        {
                            model: models.PokemonTipos,
                            as: "tipo",
                            attributes: ["id_tipo", "nombre"]
                        }
                    ]
                },
                {
                    model: models.Movimientos,
                    as: "movimiento4",
                    attributes: ["id", "nombre", "tipo_id", "categoria", "poder", "precision", "descripcion"],
                    include: [
                        {
                            model: models.PokemonTipos,
                            as: "tipo",
                            attributes: ["id_tipo", "nombre"]
                        }
                    ]
                }

            ],
        });
        if (!pokemonEnEquipo) {
            return res.status(404).json({ message: "Pokémon no encontrado en el equipo" });
        }
        const pokemonDetails = {
            id: pokemonEnEquipo.id,
            pokemon_id: pokemonEnEquipo.pokemon_id,
            nombre: pokemonEnEquipo.pokemon?.nombre,
            apodo: pokemonEnEquipo.apodo,
            img_url: pokemonEnEquipo.pokemon?.img_url,
            tipo: pokemonEnEquipo.pokemon?.tipo,
            items_id: pokemonEnEquipo.items_id,
            item: pokemonEnEquipo.item ? { id: pokemonEnEquipo.item.id, nombre: pokemonEnEquipo.item.nombre } : null,
            habilidad: pokemonEnEquipo.habilidad,
            naturaleza_id: pokemonEnEquipo.naturaleza_id,
            naturaleza: pokemonEnEquipo.naturaleza ? { id: pokemonEnEquipo.naturaleza.id, nombre: pokemonEnEquipo.naturaleza.nombre } : null,
            tipos: pokemonEnEquipo.pokemon?.tipos?.map(t => t.nombre) || [],
            ev_hp: pokemonEnEquipo.ev_hp,
            ev_atk: pokemonEnEquipo.ev_atk,
            ev_def: pokemonEnEquipo.ev_def,
            ev_spatk: pokemonEnEquipo.ev_spatk,
            ev_spdef: pokemonEnEquipo.ev_spdef,
            ev_speed: pokemonEnEquipo.ev_speed,
            iv_hp: pokemonEnEquipo.iv_hp,
            iv_atk: pokemonEnEquipo.iv_atk,
            iv_def: pokemonEnEquipo.iv_def,
            iv_spatk: pokemonEnEquipo.iv_spatk,
            iv_spdef: pokemonEnEquipo.iv_spdef,
            iv_speed: pokemonEnEquipo.iv_speed,
            movimiento1_id: pokemonEnEquipo.movimiento1_id,

            movimiento2_id: pokemonEnEquipo.movimiento2_id,
            movimiento3_id: pokemonEnEquipo.movimiento3_id,
            movimiento4_id: pokemonEnEquipo.movimiento4_id,
            movimientos: {
                movimiento1: pokemonEnEquipo.movimiento1
                    ? {
                        id: pokemonEnEquipo.movimiento1.id,
                        nombre: pokemonEnEquipo.movimiento1.nombre,
                        poder: pokemonEnEquipo.movimiento1.poder,
                        tipo: pokemonEnEquipo.movimiento1.tipo_id,
                        tipo_nombre: pokemonEnEquipo.movimiento1.tipo?.nombre 
                    }
                    : null,
            }
        };
        res.json(pokemonDetails);
    } catch (error) {
        console.error("Error al obtener el Pokémon en el equipo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


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

        const habilidadesValidas = [
            pokemonSpecies.habilidad1,
            pokemonSpecies.habilidad2,
            pokemonSpecies.habilidad_oculta
        ].filter(Boolean);
        if (habilidad && !habilidadesValidas.includes(habilidad)) {
            return res.status(400).json({ message: "La habilidad seleccionada no es válida para este Pokémon." });
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


exports.editPokemonInTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            apodo,
            items_id,
            habilidad,
            naturaleza_id,
            ev_hp, ev_atk, ev_def, ev_spatk, ev_spdef, ev_speed,
            iv_hp, iv_atk, iv_def, iv_spatk, iv_spdef, iv_speed,
            movimiento1_id, movimiento2_id, movimiento3_id, movimiento4_id,
            tipos // 
        } = req.body;

        // 1. Buscar el registro
        const pokemonEnEquipo = await models.Pokemon_en_equipo.findByPk(id);
        if (!pokemonEnEquipo) {
            return res.status(404).json({ message: "Pokémon en equipo no encontrado." });
        }

        // 2. Validar habilidad si es necesario (igual que antes)
        if (habilidad) {
            const pokemonSpecies = await models.Pokemon.findByPk(pokemonEnEquipo.pokemon_id);
            const habilidadesValidas = [
                pokemonSpecies.habilidad1,
                pokemonSpecies.habilidad2,
                pokemonSpecies.habilidad_oculta
            ].filter(Boolean);
            if (!habilidadesValidas.includes(habilidad)) {
                return res.status(400).json({ message: "La habilidad seleccionada no es válida para este Pokémon." });
            }
        }

        // 3. Actualizar los campos principales
        await pokemonEnEquipo.update({
            apodo,
            items_id,
            habilidad,
            naturaleza_id,
            ev_hp, ev_atk, ev_def, ev_spatk, ev_spdef, ev_speed,
            iv_hp, iv_atk, iv_def, iv_spatk, iv_spdef, iv_speed,
            movimiento1_id, movimiento2_id, movimiento3_id, movimiento4_id
        });

        // 4. Actualizar tipos en la tabla intermedia
        if (Array.isArray(tipos)) {
            await models.PokemonConTipo.destroy({
                where: { id_pokemon: pokemonEnEquipo.pokemon_id }
            });

            for (const tipo of tipos) {
                let tipoObj = typeof tipo === "number"
                    ? await models.PokemonTipos.findByPk(tipo)
                    : await models.PokemonTipos.findOne({ where: { nombre: tipo } });

                if (tipoObj) {
                    await models.PokemonConTipo.create({
                        id_pokemon: pokemonEnEquipo.pokemon_id,
                        id_tipo: tipoObj.id_tipo
                    });
                }
            }
        }

        res.json({ message: "Pokémon en equipo actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar Pokémon en equipo:", error);
        res.status(500).json({ message: "Error interno del servidor al actualizar Pokémon en equipo." });
    }
};

exports.deletePokemonEnEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonEnEquipo = await models.Pokemon_en_equipo.findByPk(id);
        if (!pokemonEnEquipo) {
            return res.status(404).json({ message: "Pokémon en equipo no encontrado." });
        }
        await pokemonEnEquipo.destroy();
        res.json({ message: "Pokémon eliminado del equipo correctamente." });
    } catch (error) {
        console.error("Error al eliminar Pokémon del equipo:", error);
        res.status(500).json({ message: "Error interno del servidor al eliminar Pokémon del equipo." });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await models.Equipos.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: "Equipo no encontrado." });
        }
        await equipo.destroy();
        res.json({ message: "Equipo eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el equipo:", error);
        res.status(500).json({ message: "Error interno del servidor al eliminar el equipo." });
    }
};