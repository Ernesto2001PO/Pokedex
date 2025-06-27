module.exports = (app) => {
    const tiposController = require("../controllers/tipos.controller.js");
    const router = require("express").Router();

    router.get("/obtener", tiposController.getAllTipos);

    app.use("/api/tipos", router);
}