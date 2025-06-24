const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const naturalezasController = require("../controllers/naturaleza.controller.js");
    const router = require("express").Router();

    router.get("/obtener", naturalezasController.getAllNaturalezas);

    app.use("/api/naturalezas", router);
}