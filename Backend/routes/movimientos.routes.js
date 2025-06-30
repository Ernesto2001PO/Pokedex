const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const movimientoController = require("../controllers/movimiento.controller.js");
    const router = require("express").Router();

    router.get("/obtener", movimientoController.getAllMovimientos);
    router.post("/aprender", movimientoController.aprenderMovimientoPokemon);
    app.use("/api/movimientos", router);
}