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
    }, {
        tableName: 'naturalezas',
        timestamps: false,
    });
    return Naturaleza;
};