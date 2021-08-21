const Sequelize = require('sequelize')
const User = require('/user')
const Route = require('/route')
const Destination = require('/destination')
  
const sequelize = require('../utils/database')
  
// Define ActiveDriver table
const ActiveDriver = sequelize.define('activeDriver', {

    /* Geolocation in Google API returns 
    {
    "location": {
        "lat": 37.421875199999995,
        "lng": -122.0851173
    },
    "accuracy": 120
    }*/
    current_location: { type: Sequelize.JSON, allowNull:false },

    capacity: { type: Sequelize.INTEGER, allowNull:false },
})

ActiveDriver.belongsTo(User, {foreignKey: 'driver_sid'})
ActiveDriver.belongsTo(Destination, {foreignKey: 'destination_id'})
  
ActiveDriver.hasOne(Route)

module.exports = ActiveDriver
