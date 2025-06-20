module.exports = app => {
    require("./usuario.routes")(app);
    require("./pokemon.routes")(app);   
    require("./equipos.route")(app);


}