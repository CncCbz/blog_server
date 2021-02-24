const { User, Authority } = require('../model');
const { checkAuth } = require('../utils');
const getRoles = async (ctx, next) => {
  const { userName } = ctx.request.body;

  const allRoles = await Authority.findAll({
    attributes: ['role', 'rolename', 'weight'],
    raw: true
  });
  const { role: operatorRole } = await User.findOne({
    where: { userName },
    attributes: ['role'],
    raw: true
  });
  const { weight: operatorWeight } = await Authority.findOne({
    where: { role: operatorRole },
    attributes: ['weight'],
    raw: true
  });
  let roles = [];
  allRoles.forEach(item => {
    if (operatorWeight <= item.weight) {
      delete item.weight;
      roles.push({
        ...item,
        disabled: true
      });
    } else {
      delete item.weight;
      roles.push(item);
    }
  });
  ctx.body = {
    msg: 'success',
    data: '读取成功！',
    roles
  };
};

module.exports = {
  getRoles
};
