// src/models/PokemonSpeciesType.js
const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const PokemonConTipo = sequelize.define(
        'PokemonConTipo',
        {
            id_pokemon: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'pokemon',
                    key: 'id_pokemon',
                },
            },
            id_tipo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'pokemon_tipos',
                    key: 'id_tipo',
                },
            },
        },
        {
            tableName: 'pokemon_con_tipo',
            timestamps: false,
        }
    );

    return PokemonConTipo;
};