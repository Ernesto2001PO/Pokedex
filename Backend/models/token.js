const { DataTypes } = require('sequelize');



module.exports = function (sequelize) {
    const Token = sequelize.define(
        'Token',
        {
            id: { 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'token',
            timestamps: false,
        }
    );
    return Token;
}