const { sequelize } = require("../config/db.config");

const Usuario = require("./usuario")(sequelize);
const Token = require("./token")(sequelize);
const Pokemon = require("./pokemon")(sequelize);




module.exports = {
    Usuario,
    Token,
    Pokemon,
    sequelize,
    Sequelize: sequelize.Sequelize
};