'use strict';
const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')
const Role = sequelize.define('Role',
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
    },
    roleName: {
      type: DataTypes.ENUM('user','admin'),
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  }, {
  sequelize,
  modelName: 'Role',
  tableName: 'Roles'
})

module.exports = {
  Role, sequelize
}