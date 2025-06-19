const express = require('express');

const db = require('./models/'); 
const app = express();
const port = process.env.PORT || 3000;





const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// cargar las rutas
require('./routes/index.js')(app);
require('./models/relations.js');





app.get("/", (req, res) => {
    res.send("¡Hola mundo!");
});



db.sequelize
    .sync({
        alter: true,

    })
    .then(() => {
        console.log("Base de datos sincronizada");
    })
    .catch((error) => {
        console.error("Error al sincronizar la base de datos:", error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
