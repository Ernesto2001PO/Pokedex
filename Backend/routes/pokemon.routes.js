const { requireUser, requireAdmin } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const pokemonController = require("../controllers/pokemon.controller.js");
    const router = require("express").Router();
    const multer = require('multer');
    const path = require('path');


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    
    router.get("/obtener", pokemonController.getAllPokemon);
    router.get("/obtener/:id", pokemonController.getPokemonById);


    router.post('/crear', requireUser, requireAdmin, upload.single('img_url'), pokemonController.createPokemon);
    router.put("/editar/:id", requireUser, requireAdmin, upload.single('img_url'), pokemonController.updatePokemon);
    router.delete("/eliminar/:id", requireUser, requireAdmin, pokemonController.deletePokemon);
    

    app.use("/api/pokemon", router);
}