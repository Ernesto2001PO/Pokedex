const models = require('.');



// =================== USUARIO ===================
models.Usuario.hasMany(models.Token, {
    foreignKey: 'usuario_id',
});
models.Token.belongsTo(models.Usuario, {
    foreignKey: 'usuario_id',
});


// =================== POKEMON ==================


models.Pokemon.belongsToMany(models.PokemonTipos, {
    through: models.PokemonConTipo,
    foreignKey: 'id_pokemon',
    otherKey: 'id_tipo',
    as: 'tipos'
});
models.PokemonTipos.belongsToMany(models.Pokemon, {
    through: models.PokemonConTipo,
    foreignKey: 'id_tipo',
    otherKey: 'id_pokemon',
    as: 'pokemones'
});

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


models.Pokemon.belongsToMany(models.Movimientos, {
    through: models.PokemonAprenderMovimiento,
    foreignKey: 'id_pokemon',
    otherKey: 'id_movimiento',
    as: 'movimientosAprendibles' 
});


models.Pokemon_en_equipo.belongsTo(models.Items, { as: "item", foreignKey: "items_id" });
models.Pokemon_en_equipo.belongsTo(models.Naturalezas, { as: "naturaleza", foreignKey: "naturaleza_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento1", foreignKey: "movimiento1_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento2", foreignKey: "movimiento2_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento3", foreignKey: "movimiento3_id" });
models.Pokemon_en_equipo.belongsTo(models.Movimientos, { as: "movimiento4", foreignKey: "movimiento4_id" });










models.Movimientos.belongsTo(models.PokemonTipos, {
    foreignKey: 'tipo_id',
    as: 'tipo'
});
models.PokemonTipos.hasMany(models.Movimientos, {
    foreignKey: 'tipo_id',
    as: 'movimientos'
});
