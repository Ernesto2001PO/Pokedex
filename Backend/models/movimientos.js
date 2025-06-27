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
        tipo_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemon_tipos',
                key: 'id_tipo',
            },
        },
        categoria: { 
            type: DataTypes.ENUM('Físico', 'Especial', 'Estado'),
            allowNull: false,
        },
        poder: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        precision: { 
            type: DataTypes.INTEGER,
            allowNull: true, 
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