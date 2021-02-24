const { User, Authority } = require('../model');

/**
 * 用户鉴权
 * @param {String} userName 用户名
 * @param {Strung} authName 权限名称
 */
const checkAuth = async (userName, authName) => {
  const user = await User.findOne({
    where: { username: userName }
  });
  const role = user.role;
  const auth = await Authority.findOne({
    where: { role: role }
  });
  if (auth[authName]) {
    return true;
  }
  return false;
};

module.exports = {
  checkAuth
};
