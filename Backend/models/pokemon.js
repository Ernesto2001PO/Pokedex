const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    const Pokemon = sequelize.define(
        'Pokemon',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nivel: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'pokemon',
            timestamps: false,
        }
    );

    return Pokemon;
}