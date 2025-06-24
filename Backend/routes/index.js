module.exports = app => {
    require("./usuario.routes")(app);
    require("./pokemon.routes")(app);   
    require("./equipos.route")(app);
    require("./items.routes")(app);
    require("./naturalezas.route")(app);
    require("./movimientos.routes")(app);


}