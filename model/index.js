const Sequelize = require('sequelize');

const { SEQUELIZE_CONFIG, MYSQL_CONFIG } = require('../config');

const { define_schema_user } = require('./user');
const { define_schema_auth } = require('./authority');

const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.username, MYSQL_CONFIG.password, SEQUELIZE_CONFIG);

const User = define_schema_user(sequelize, Sequelize);
const Authority = define_schema_auth(sequelize, Sequelize);

module.exports = {
  User,
  Authority
};
