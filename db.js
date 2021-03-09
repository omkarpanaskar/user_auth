const { Sequelize } = require('sequelize');
const config = require('./config/config.json').development
const sequelize = new Sequelize(config)
sequelize.sync({        // This creates the table if it doesn't exist (and does nothing if it already exists)
  logging: console.log,    // Default, displays the first parameter of the log function call
  // force: true,       //This creates the table, dropping it first if it already existed
  }).then(() => {
  console.log('succesfull connected');
}).catch((err) => {
    console.log('unable to connect', err)
  })
module.exports = { sequelize }