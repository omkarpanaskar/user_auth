'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// const config = require('config').get('mysql');

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}


const models = {
  Signup: require('./signup'),
  Role: require('./role')
}

Object.values(models)
	.filter((model) => typeof model.init === 'function')
	.forEach((model) => {
     model.init(sequelize, Sequelize)});

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter((model) => typeof model.associate === 'function')
	.forEach((model) => model.associate(models));
module.exports = {
  ...models,
  sequelize
};
