const Sequelize = require('sequelize')
const User = require('/user')
const Route = require('/route')
const Destination = require('/destination')
  
const sequelize = require('../utils/database')
  
// Define ActiveRider table
const ActiveRider = sequelize.define('activeRider', {

    /* Google API returns 
    {
    "location": {
        "lat": 37.421875199999995,
        "lng": -122.0851173
    },
    "accuracy": 120
    }*/
    pickup_location: { type: Sequelize.JSON, allowNull:false },
})

ActiveRider.belongsTo(User, {foreignKey: 'rider_sid'})
ActiveRider.belongsTo(Destination, {foreignKey: 'destination_id'})
  
ActiveRider.hasMany(Route)

module.exports = ActiveRider
