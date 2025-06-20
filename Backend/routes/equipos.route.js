const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const equipoController = require("../controllers/equipo.controller.js");
    const router = require("express").Router();

    router.get("/obtener/:id", equipoController.getAllTeamsByUserId);
    router.post("/crear", requireUser, equipoController.createTeam);
    router.post("/:equipo_id/agregarPokemon", requireUser, equipoController.addPokemonToTeam);

    app.use("/api/equipo", router);
}