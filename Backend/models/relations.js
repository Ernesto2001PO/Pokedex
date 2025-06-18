const models = require('.');

// =================== USUARIO ===================
models.Usuario.hasMany(models.Token, {
    foreignKey: 'usuario_id',
});
models.Token.belongsTo(models.Usuario, {
    foreignKey: 'usuario_id',
});
