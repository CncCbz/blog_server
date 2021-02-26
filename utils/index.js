const { check, compare, encrypt } = require('./check');
const { checkAuth } = require('./checkAuth');
const { judgeAuth, compareWeight } = require('./judgeAuth');
const { log2db, visitorLog } = require('./log');
const { logger } = require('./log4js');

module.exports = {
  check,
  compare,
  encrypt,
  checkAuth,
  judgeAuth,
  compareWeight,
  log2db,
  visitorLog,
  logger
};
