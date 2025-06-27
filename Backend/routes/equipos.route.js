const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const equipoController = require("../controllers/equipo.controller.js");
    const router = require("express").Router();

    router.get("/obtener/:id", equipoController.getAllTeamsByUserId);
    router.get("/obtenerId/:id", equipoController.getById);
    
    router.get("/pokemonEnEquipo/:id", equipoController.pokemonInTeam);

    router.post("/crear", requireUser, equipoController.createTeam);
    router.post("/:equipo_id/agregarPokemon", requireUser, equipoController.addPokemonToTeam);


    router.put("/editPokemon/:id", requireUser, equipoController.editPokemonInTeam);
    router.delete("/eliminarPokemon/:id", requireUser, equipoController.deletePokemonEnEquipo);
    router.delete("/eliminar/:id", requireUser, equipoController.deleteTeam);


    app.use("/api/equipo", router);
}