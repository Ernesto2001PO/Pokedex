const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const movimientoController = require("../controllers/movimiento.controller.js");
    const router = require("express").Router();

    router.get("/obtener", movimientoController.getAllMovimientos);

    app.use("/api/movimientos", router);
}