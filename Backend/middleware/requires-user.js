const db = require("../models/");

exports.requireUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "No autorizado" });
    }
    const splitted = authHeader.split(" ");
    if (splitted.length !== 2 || splitted[0] !== "Bearer") {
        return res.status(401).send({ message: "No autorizado" });
    }
    const token = splitted[1];

    if (!token) {
        return res.status(401).send({ message: "No autorizado" });
    }
    const tokenRecord = await db.Token.findOne({
        where: {
            token: token,
        },
    });
    if (!tokenRecord) {
        return res.status(401).send({ message: "No autorizado" });
    }
    const usuario = await db.Usuario.findOne({
        where: {
            id: tokenRecord.usuario_id,
        },
    });
    if (!usuario) {
        return res.status(401).send({ message: "No autorizado" });
    }
    res.locals.usuario = usuario;

    next();
};

exports.requireAdmin = async (req, res, next) => {
    const is_admin = res.locals.usuario.es_admin;
    if (is_admin === false) {
        return res.status(403).send({ message: "Acceso denegado" });
    }  
    next();
};
