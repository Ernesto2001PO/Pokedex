// src/models/Item.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Items = sequelize.define('Items', {
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
        img_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    }, {
        tableName: 'items',
        timestamps: false,
    });
    return Items;
};