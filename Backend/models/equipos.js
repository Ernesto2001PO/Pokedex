// src/models/Team.js
const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Equipos = sequelize.define(
        'Equipos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, 
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuario', 
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'equipos', 
            timestamps: false,
        }
    );

    return Equipos;
};