const { checkPassword, checkUserName } = require('../lib/validator');
const crypto = require('crypto');

const check = ctx => (userName, password) => {
  let err_data;
  const { correct: user_name_cor, message: user_name_msg } = checkUserName(userName);
  if (!user_name_cor) err_data += user_name_msg;

  const { correct: password_cor, message: password_msg } = checkPassword(password);
  if (!password_cor) err_data += password_msg;

  if (user_name_cor && password_cor) return true;

  ctx.status = 400;
  ctx.body = {
    msg: 'fail',
    data: err_data
  };
  return false;
};

/**
 * MD5加密
 */
const encrypt = data => crypto.createHash('md5').update(data).digest('hex');

/**
 * MD5加密后对比
 */
const compare = (newVal, oldVal) => encrypt(newVal) === oldVal;

module.exports = {
  check,
  encrypt,
  compare
};
