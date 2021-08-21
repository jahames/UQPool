const Sequelize = require('sequelize')
const User = require('/user')
  
const sequelize = require('../utils/database')
  
// Define Rating table
const Rating = sequelize.define('rating', {

    driver_rating: { type: Sequelize.INTEGER(1)},

    rider_rating: { type: Sequelize.INTEGER(1)},
})

Rating.belongsTo(User, {foreignKey: 'sid'})
  
module.exports = Rating
