require('dotenv').config({  });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,

  dialectOptions: {},

});



console.log("Connecting to the database...");
console.log(`Database Name: ${process.env.DB_NAME}`);
console.log(`Database User: ${process.env.DB_USER}`);
console.log(`Database Host: ${process.env.DB_HOST}`);
console.log(`Database Port: ${process.env.DB_PORT}`);
console.log(`Database Password: ${process.env.DB_PASSWORD}`);



sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });



module.exports = { sequelize, Sequelize };