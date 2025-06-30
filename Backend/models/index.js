const { sequelize } = require("../config/db.config");

const Usuario = require("./usuario")(sequelize);
const Token = require("./token")(sequelize);
//----------------------------------------//
const Pokemon = require("./pokemon")(sequelize);
const PokemonTipos = require("./pokemonTipos")(sequelize);
const PokemonConTipo = require("./pokemonConTIpo")(sequelize);
// ------------------------------------//
const Equipos = require("./equipos")(sequelize);
const Pokemon_en_equipo = require("./pokemon_en_equipo")(sequelize);

// ------------------------------------//
const Movimientos = require("./movimientos")(sequelize);
const PokemonAprenderMovimiento = require("./pokemonAprenderMovimiento")(sequelize);


const Naturalezas = require("./naturalezas")(sequelize);
const Items = require("./items")(sequelize);






module.exports = {
    Usuario,
    Token,
    Pokemon,
    PokemonTipos,
    PokemonConTipo,
    Equipos,
    Pokemon_en_equipo,
    Movimientos,
    Naturalezas,
    Items,
    PokemonAprenderMovimiento,
    sequelize,
    Sequelize: sequelize.Sequelize
};