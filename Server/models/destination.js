const Sequelize = require('sequelize')
const User = require('/user')
const ActiveDriver = require('/ActiveDriver')
const ActiveRider = require('/ActiveRider')
  
const sequelize = require('../utils/database')
  
// Define Destination table
const Destination = sequelize.define('destination', {

    //Unique ID for location
    location_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false },

    // Search with string in Google API
    destination: { type: Sequelize.STRING, allowNull:false },

})

Destination.belongsTo(User, {foreignKey: 'sid'})
  
Destination.hasOne(ActiveDriver, {
  foreignKey: {
    allowNull: false
  }
})

Destination.hasOne(ActiveRider, {
  foreignKey: {
    allowNull: false
  }
})


module.exports = Destination
