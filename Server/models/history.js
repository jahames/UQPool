const Sequelize = require('sequelize')
const Route = require('/route')
  
const sequelize = require('../utils/database')
  
// Define History table
const History = sequelize.define('history', {

    timestamp: { 
        type: Sequelize.DATE, 
        primaryKey: true,
        allowNull: false },

    message: { type: Sequelize.TEXT, allowNull:false },

})

History.belongsTo(Route, {foreignKey: 'route_id'})
  
module.exports = History
