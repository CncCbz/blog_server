const { PORT_CONFIG } = require('./port');
const { CORS_CONFIG } = require('./cors');
const { EVN_CONFIG } = require('./env');
const { MYSQL_CONFIG } = require('./mysql');
const { SEQUELIZE_CONFIG } = require('./sequelize');
const { SECRET_CONFIG } = require('./secret');
const { ghsConfig, ghsList } = require('./ghs');

module.exports = {
  PORT_CONFIG,
  CORS_CONFIG,
  EVN_CONFIG,
  MYSQL_CONFIG,
  SEQUELIZE_CONFIG,
  SECRET_CONFIG,
  ghsConfig,
  ghsList
};
