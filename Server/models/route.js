const Sequelize = require('sequelize')
const ActiveRider = require('/ActiveRider')
const ActiveDriver = require('/ActiveDriver')
const History = require('/History')
  
const sequelize = require('../utils/database.js')
  
// Define Route table
const Route = sequelize.define('route', {
    route_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    order: { type: Sequelize.INTEGER, allowNull:false },

    // Timestamp route initiated
    start_time: { type: Sequelize.DATE},

    // Timestamp rider pickup
    pickup_time: { type: Sequelize.DATE},

    // Timestamp rider arrive
    arrive_time: { type: Sequelize.DATE}
})
  
Route.belongsTo(ActiveDriver, {foreignKey: 'driver_sid'})
Route.belongsTo(ActiveRider, {foreignKey: 'rider_sid'})

Route.hasMany(History)

module.exports = Route
