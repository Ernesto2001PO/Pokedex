const models = require("../models");
const TOKEN = require("../utils/token");


exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password_hash, es_admin } = req.body;

        const usuarioExistente = await models.Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashedpassword = TOKEN.generarPassword(password_hash);

        console.log("usuario verficado");

        const nuevoUsuario = await models.Usuario.create({
            nombre,
            email,
            password_hash: hashedpassword,
            es_admin: false,
        });

        res.send({
            message: "Usuario creado exitosamente",
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                es_admin: nuevoUsuario.es_admin,
                fecha_creacion: nuevoUsuario.fecha_creacion,
            },
        });



    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await models.Usuario.findAll();
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios" });
        }


        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.login = async (req, res) => {
    try {
        const { nombre, password } = req.body;

        if (!nombre || !password) {
            return res.status(400).json({ message: "Nombre y contraseña son requeridos" });
        }

        const usuario = await models.Usuario.findOne({ where: { nombre } });
        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const hashedpassword = TOKEN.generarPassword(password);

        if (usuario.password_hash !== hashedpassword) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = await models.Token.create({
            usuario_id: usuario.id,
            token: TOKEN.generarToken(usuario),
        });
        if (!token) {
            return res.status(500).json({ message: "Error al generar el token" });
        }

        res.send({
            message: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                token: token.token,
                es_admin: usuario.es_admin,
                fecha_creacion: usuario.fecha_creacion,
            },
        });


    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.hacerAdmin = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const usuario = await models.Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (usuario.es_admin === true) {
            return res.status(400).json({ message: "El usuario ya es administrador" });
        }

        usuario.es_admin = true;
        await usuario.save();

        res.json({
            message: "Usuario actualizado a administrador exitosamente",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                es_admin: usuario.es_admin,
                fecha_creacion: usuario.fecha_creacion,
            },
        });
    } catch (error) {
        console.error("Error al hacer administrador al usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ message: "Nueva contraseña es requerida" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        const usuario = await models.Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const hashedNewPassword = TOKEN.generarPassword(newPassword);
        if (usuario.password_hash === hashedNewPassword) {
            return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la anterior" });
        }
        usuario.password_hash = hashedNewPassword;
        await usuario.save();
        res.json({
            message: "Contraseña actualizada exitosamente",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                es_admin: usuario.es_admin,
                fecha_creacion: usuario.fecha_creacion,
            },
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}