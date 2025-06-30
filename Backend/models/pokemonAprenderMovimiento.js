const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const PokemonAprenderMovimiento = sequelize.define('PokemonAprenderMovimiento', {
        id_pokemon: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'pokemon',
                key: 'id_pokemon',
            },
        },
        id_movimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'movimientos',
                key: 'id',
            },
        }
    }, {
        tableName: 'pokemon_aprender_movimiento',
        timestamps: false,
    });

    return PokemonAprenderMovimiento;
}