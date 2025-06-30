module.exports = (app) => {
    const equipoController = require("../controllers/equipo.controller.js");
    const router = require("express").Router();

    router.get("/obtener/:id", requireUser, equipoController.getAllTeamsByUserId);




    app.use("/api/admin", router);
}