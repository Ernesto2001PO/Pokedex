// src/models/pokemon_en_equipo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const pokemon_en_equipo = sequelize.define('pokemon_en_equipo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        equipo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'equipos',
                key: 'id',
            },
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemon',
                key: 'id_pokemon',
            },
        },
        items_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'items',
                key: 'id',
            },
        },
        slot_number: { 
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 6 },
        },
        apodo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        habilidad: { 
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        naturaleza_id: { 
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'naturalezas',
                key: 'id',
            },
        },
        // EVs
        ev_hp: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        ev_atk: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        ev_def: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        ev_spatk: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        ev_spdef: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        ev_speed: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: { min: 0, max: 252 } },
        // IVs
        iv_hp: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        iv_atk: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        iv_def: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        iv_spatk: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        iv_spdef: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        iv_speed: { type: DataTypes.INTEGER, defaultValue: 31, allowNull: false, validate: { min: 0, max: 31 } },
        // Movimientos
        movimiento1_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'movimientos', key: 'id' } },
        movimiento2_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'movimientos', key: 'id' } },
        movimiento3_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'movimientos', key: 'id' } },
        movimiento4_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'movimientos', key: 'id' } },
    }, {
        tableName: 'pokemon_en_equipo',
        timestamps: false,
    });
    return pokemon_en_equipo;
};