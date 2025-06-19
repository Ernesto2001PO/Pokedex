const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    const PokemonTipos = sequelize.define(
        'PokemonTipos',
        {
            id_tipo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'pokemon_tipos',
            timestamps: false,
        }
    );

    return PokemonTipos;
}