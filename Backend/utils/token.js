const sha1 = require("sha1");


module.exports = {
    generarToken: (usuario) => {
        
        return sha1(usuario.email + usuario.id + Date.now() + Math.random());
    },
    generarPassword: (password) => {
        const password_hash = sha1(password);
        return password_hash;
    }
}



