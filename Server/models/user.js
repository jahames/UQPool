const Sequelize = require('sequelize')
const ActiveDriver = require('/ActiveDriver')
const ActiveRider = require('/ActiveRider')
const Rating = require('/Rating')
const Destination = require('/Destination')
  
const sequelize = require('../utils/database.js')
  
// Define User table
const User = sequelize.define('user', {
    sid: {
        type: Sequelize.STRING(9),
        allowNull: false,
        primaryKey: true
    },

    first_name: { type: Sequelize.STRING, allowNull:false },

    last_name: { type: Sequelize.STRING, allowNull:false },

    email: { type: Sequelize.STRING, allowNull:false },

    phone: { type: Sequelize.INTEGER(10) },

    bio: { type: Sequelize.TEXT },

    image: { type: Sequelize.STRING },

    tokens: { type: Sequelize.INTEGER }
})

User.hasOne(ActiveDriver, {
  foreignKey: {
    allowNull: false
  }
})

User.hasOne(ActiveRider, {
  foreignKey: {
    allowNull: false
  }
})

User.hasOne(Rating, {
  foreignKey: {
    allowNull: false
  }
})

User.hasMany(Destination)

module.exports = User
