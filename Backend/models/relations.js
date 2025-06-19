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

