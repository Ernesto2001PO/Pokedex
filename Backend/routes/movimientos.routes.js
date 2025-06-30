const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const movimientoController = require("../controllers/movimiento.controller.js");
    const router = require("express").Router();

    router.get("/obtener", movimientoController.getAllMovimientos);
    router.post("/aprender", movimientoController.aprenderMovimientoPokemon);


    router.post("/crear", requireUser, movimientoController.createMovimiento);
    router.put("/editar/:id", requireUser, movimientoController.updateMovimiento);
    router.delete("/eliminar/:id", requireUser, movimientoController.deleteMovimiento);



    app.use("/api/movimientos", router);
}