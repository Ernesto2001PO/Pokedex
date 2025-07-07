const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    const Pokemon = sequelize.define(
        'Pokemon',
        {
            id_pokemon: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, 
            },
            habilidad1: {
                type: DataTypes.STRING,
                allowNull: true, 
            },
            habilidad2: {
                type: DataTypes.STRING,
                allowNull: true, 
            },
            habilidad_oculta: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            img_url: {
                type: DataTypes.STRING,
                allowNull: true, 
            },
            base_hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            base_attack: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            base_defense: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            base_speedAtk: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            base_speedDef: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            base_speed: {
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