const { User, Authority, Log } = require('../model');
const { Op } = require('sequelize');
const { checkAuth, encrypt, judgeAuth, compareWeight } = require('../utils');

const getLogs = async (ctx, next) => {
  const authName = 'log';
  const { operator, curPage, limit } = ctx.request.body;

  const isAllow = await checkAuth(operator, authName);
  const { role: operatorRole } = await User.findOne({
    where: { username: operator },
    raw: true,
    attributes: ['role']
  });
  const isAdmin = await compareWeight(operatorRole, 'admin', true);
  const isSuperAdmin = await compareWeight(operatorRole, 'superAdmin', true);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '权限不足！'
    };
    return;
  }
  if (isSuperAdmin) {
    const { rows, count } = await Log.findAndCountAll({
      order: [['id', 'DESC']],
      raw: true,
      limit,
      offset: limit * (curPage - 1)
    });
    ctx.body = {
      msg: 'success',
      data: '日志获取成功！',
      logs: rows,
      total: count
    };
    return;
  }
  if (isAdmin) {
    const { rows, count } = await Log.findAndCountAll({
      where: {
        type: {
          [Op.ne]: 'ghs'
        }
      },
      order: [['id', 'DESC']],
      raw: true,
      limit,
      offset: limit * (curPage - 1)
    });
    ctx.body = {
      msg: 'success',
      data: '日志获取成功！',
      logs: rows,
      total: count
    };
    return;
  }
  const { rows, count } = await Log.findAndCountAll({
    where: {
      [Op.or]: [{ operator }, { target: operator }]
    },
    order: [['id', 'DESC']],
    raw: true,
    limit,
    offset: limit * (curPage - 1)
  });
  ctx.body = {
    msg: 'success',
    data: '日志获取成功！',
    logs: rows,
    total: count
  };
};

module.exports = {
  getLogs
};
