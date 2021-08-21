/* Setup up ORM Sequelize which connects the server to the database*/

/* JS libraries to import */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('poolDB', 'root', 'Password1!', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
