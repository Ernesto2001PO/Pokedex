const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const itemsController = require("../controllers/item.controller.js");
    const router = require("express").Router();

    router.get("/obtener", itemsController.getAllItems);

    app.use("/api/items", router);
}