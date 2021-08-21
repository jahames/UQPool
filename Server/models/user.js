const Sequelize = require('sequelize')
  
const sequelize = require('../utils/database.js')
  
// Define User table
const User = sequelize.define('user', {
    sid:{
        type:Sequelize.STRING(9),
        allowNull:false,
        primaryKey:true
    },

    firstName: { type: Sequelize.STRING, allowNull:false },

    lastName: { type: Sequelize.STRING, allowNull:false },

    email: { type: Sequelize.STRING, allowNull:false },

    phone: { type: Sequelize.INTEGER(10) },

    bio: { type: Sequelize.TEXT },

    picure: { type: Sequelize.STRING },

    tokens: { type: Sequelize.INTEGER }
})
  
module.exports = User
