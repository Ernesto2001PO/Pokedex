// src/models/Movimiento.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Movimiento = sequelize.define('Movimiento', {
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
        tipo_id: { // FK al tipo del movimiento (ej. Fuego, Agua)
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemon_tipos',
                key: 'id_tipo',
            },
        },
        categoria: { // 'Físico', 'Especial', 'Estado'
            type: DataTypes.ENUM('Físico', 'Especial', 'Estado'),
            allowNull: false,
        },
        poder: { // Valor de poder del ataque
            type: DataTypes.INTEGER,
            allowNull: true, // Los movimientos de estado no tienen poder
        },
        precision: { // Precisión del movimiento
            type: DataTypes.INTEGER,
            allowNull: true, // Algunos movimientos siempre aciertan
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'movimientos',
        timestamps: false,
    });
    return Movimiento;
};