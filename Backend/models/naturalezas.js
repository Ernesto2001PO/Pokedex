// src/models/Naturaleza.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Naturaleza = sequelize.define('Naturaleza', {
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
        // Nombre del stat que aumenta (ej. 'attack', 'sp_attack', 'speed', etc.)
        aumenta_stat: {
            type: DataTypes.STRING,
            allowNull: true, // Algunas naturalezas no aumentan nada
        },
        // Nombre del stat que disminuye (ej. 'attack', 'sp_attack', 'speed', etc.)
        disminuye_stat: {
            type: DataTypes.STRING,
            allowNull: true, // Algunas naturalezas no disminuyen nada
        },
    }, {
        tableName: 'naturalezas',
        timestamps: false,
    });
    return Naturaleza;
};