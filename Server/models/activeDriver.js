const Sequelize = require('sequelize')
const User = require('/user')
  
const sequelize = require('../utils/database')
  
// Define User table
const ActiveDriver = sequelize.define('activeDriver', {

    /* Geolocation in Google API returns 
    {
    "location": {
        "lat": 37.421875199999995,
        "lng": -122.0851173
    },
    "accuracy": 120
    }
    */
    currentLocation: { type: Sequelize.JSON, allowNull:false },

    // Search with string in Google API
    destination: { type: Sequelize.STRING, allowNull:false },

    capacity: { type: Sequelize.INTEGER, allowNull:false },

    routeId: { type: Sequelize.INTEGER, allowNull:false},
})

activeDriver.belongsTo(User, {foreignKey: 'driverId'})
  
module.exports = ActiveDriver
