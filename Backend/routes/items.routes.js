const { requireUser } = require("../middleware/requires-user.js");

module.exports = (app) => {
    const itemsController = require("../controllers/item.controller.js");
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





    router.get("/obtener", itemsController.getAllItems);

    router.post("/crear", requireUser, upload.single('img_url'), itemsController.createItem);
    router.put("/editar/:id", requireUser, upload.single('img_url'), itemsController.updateItem);

    router.delete("/eliminar/:id", requireUser, itemsController.deleteItem);



    app.use("/api/items", router);
}