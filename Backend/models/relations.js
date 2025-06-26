const models = require('.');



// =================== USUARIO ===================
models.Usuario.hasMany(models.Token, {
    foreignKey: 'usuario_id',
});
models.Token.belongsTo(models.Usuario, {
    foreignKey: 'usuario_id',
});


// =================== POKEMON ===================
models.Pokemon.belongsToMany(models.PokemonTipos, {
    through: models.PokemonConTipo,
    foreignKey: 'id_pokemon',
    otherKey: 'id_tipo',
    as: 'tipos'
});

// Un Tipo puede pertenecer a muchos Pokémon (a través de PokemonConTipo)
models.PokemonTipos.belongsToMany(models.Pokemon, {
    through: models.PokemonConTipo,
    foreignKey: 'id_tipo',
    otherKey: 'id_pokemon',
    as: 'pokemones'
});


// ...existing code...

// Relación: Un equipo tiene muchos pokemon_en_equipo
models.Equipos.hasMany(models.Pokemon_en_equipo, {
    foreignKey: 'equipo_id',
    as: 'pokemones_en_equipo'
});
models.Pokemon_en_equipo.belongsTo(models.Equipos, {
    foreignKey: 'equipo_id',
    as: 'equipo'
});

// Relación: Un pokemon_en_equipo pertenece a un Pokemon
models.Pokemon_en_equipo.belongsTo(models.Pokemon, {
    foreignKey: 'pokemon_id',
    as: 'pokemon'
});

// (Opcional) Un Pokemon puede estar en muchos pokemon_en_equipo
models.Pokemon.hasMany(models.Pokemon_en_equipo, {
    foreignKey: 'pokemon_id',
    as: 'pokemones_en_equipo'
});



models.Pokemon_en_equipo.belongsTo(models.Items, { as: "item", foreignKey: "items_id" });
models.Pokemon_en_equipo.belongsTo(models.Naturalezas, { as: "naturaleza", foreignKey: "naturaleza_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento1", foreignKey: "movimiento1_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento2", foreignKey: "movimiento2_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento3", foreignKey: "movimiento3_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento4", foreignKey: "movimiento4_id" });
