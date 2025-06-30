const models = require("../models");


exports.getAllItems = async (req, res) => {
    try {
        const items = await models.Items.findAll();
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No se encontraron items" });
        }
        res.json(items);
    } catch (error) {
        console.error("Error al obtener los items:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.createItem = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const img_url = req.file ? req.file.path : null;
        if (!nombre || !descripcion || !img_url) {
            return res.status(400).json({ message: "Faltan datos necesarios para crear el item" });
        }
        const newItem = await models.Items.create({
            nombre,
            descripcion,
            img_url
        });
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error al crear el item:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        let img_url = req.file ? req.file.path : req.body.img_url;

        const item = await models.Items.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item no encontrado" });
        }

        await item.update({
            nombre,
            descripcion,
            img_url
        });

        res.json(item);
    } catch (error) {
        console.error("Error al actualizar el Item:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await models.Items.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item no encontrado" });
        }
        await item.destroy();
        res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el item:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
