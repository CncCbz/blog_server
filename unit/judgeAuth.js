const { User, Authority } = require('../model');

/**
 * 权重比较
 * @param {String} operator 修改人
 * @param {Strung} user 被修改人
 */
const judgeAuth = async (operator, user) => {
  const userInfo = await User.findOne({
    attributes: ['role'],
    where: { username: user },
    raw: true
  });
  const userRole = userInfo.role;
  const userAuth = await Authority.findOne({
    attributes: ['weight'],
    where: { role: userRole },
    raw: true
  });
  const userWeight = userAuth.weight;
  const { role: operatorRole } = await User.findOne({
    attributes: ['role'],
    where: { username: operator },
    raw: true
  });
  // const operatorRole = operatorInfo.role;
  const { weight: operatorWeight } = await Authority.findOne({
    attributes: ['weight'],
    where: { role: operatorRole },
    raw: true
  });
  // const operatorWeight = operatorAuth.weight;
  return operatorWeight > userWeight;
};

/**
 * 权重比较
 * @param {Strign} role1 角色1
 * @param {Strign} role2 角色2
 */
const compareWeight = async (role1, role2) => {
  const { weight: role1Weight } = await Authority.findOne({
    attributes: ['weight'],
    where: { role: role1 },
    raw: true
  });
  const { weight: role2Weight } = await Authority.findOne({
    attributes: ['weight'],
    where: { role: role2 },
    raw: true
  });
  return role1Weight > role2Weight;
};

module.exports = {
  judgeAuth,
  compareWeight
};
