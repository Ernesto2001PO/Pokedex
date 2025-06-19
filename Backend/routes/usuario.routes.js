const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const usuarioController = require("../controllers/usuario.controller.js");
    const router = require("express").Router();   


    router.post("/crear", usuarioController.crearUsuario);
    router.get("/obtener", requireUser,usuarioController.obtenerUsuarios);
    router.post("/login", usuarioController.login);
    router.put("/hacer_admin/:id_usuario", requireUser, usuarioController.hacerAdmin);

    app.use("/api/usuario", router);
}