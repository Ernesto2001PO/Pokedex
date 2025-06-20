const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const pokemonController = require("../controllers/pokemon.controller.js");
    const router = require("express").Router();   

    router.get("/obtener", pokemonController.getAllPokemon);
    router.get("/obtener/:id", pokemonController.getPokemonById);

    app.use("/api/pokemon", router);
}