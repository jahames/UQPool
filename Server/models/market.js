const Sequelize = require('sequelize')
  
const sequelize = require('../utils/database')
  
// Define Market table
const Market = sequelize.define('market', {

    product_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false },

    // Token value of reward
    value: { type: Sequelize.INTEGER, allowNull:false },

    description: { type: Sequelize.TEXT, allowNull:false },

    image: { type: Sequelize.STRING, allowNull:false },

})
  
module.exports = Market
