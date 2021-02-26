const { User, Authority } = require('../model');
const { checkAuth, encrypt, judgeAuth, compareWeight } = require('../utils');
const { log2db } = require('../utils');
const sequelize = require('sequelize');

const type = 'user';

const getUsers = async (ctx, next) => {
  const authName = 'listuser';
  const { userName } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const users = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['password'],
        include: [[sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('create_time'), '%Y-%m-%d %H:%i:%s'), 'create_time']]
      }
    });
    ctx.body = {
      msg: 'success',
      data: '读取成功！',
      users
    };
  } else {
    ctx.body = {
      msg: 'fail',
      data: '您没有权限查看！'
    };
  }
};
const editUser = async (ctx, next) => {
  const authName = 'edituser';
  const { operator, formData } = ctx.request.body;
  const id = formData.id;
  const { username } = await User.findOne({
    attributes: ['username'],
    where: { id },
    raw: true
  });
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'update',
    target: username,
    operator
  };
  const isAllow = await checkAuth(operator, authName);
  const enoughWeight = await judgeAuth(operator, username);
  if (isAllow && enoughWeight) {
    delete formData.id;
    const ret = await User.update(formData, { where: { id } });
    if (ret[0]) {
      log_infos['result'] = 'success';
      ctx.body = {
        msg: 'success',
        data: '更新成功！'
      };
    } else {
      log_infos['result'] = 'fail';
      log_infos['reason'] = '无改动';
      ctx.body = {
        msg: 'fail',
        data: '更新失败！您没有改动！'
      };
    }
  } else {
    log_infos['result'] = 'fail';
    log_infos['reason'] = '权限不足';
    ctx.body = {
      msg: 'fail',
      data: '您没有权限编辑！'
    };
  }
  log2db(log_infos);
};
const deleteUser = async (ctx, next) => {
  const authName = 'edituser';
  const { operator, id } = ctx.request.body;
  const { username } = await User.findOne({
    attributes: ['username'],
    where: { id },
    raw: true
  });
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'delete',
    target: username,
    operator
  };
  const isAllow = await checkAuth(operator, authName);
  const enoughWeight = await judgeAuth(operator, username);
  if (isAllow && enoughWeight) {
    const ret = await User.destroy({ where: { id } });
    if (ret) {
      log_infos['result'] = 'success';
      ctx.body = {
        msg: 'success',
        data: '删除成功！'
      };
    } else {
      log_infos['result'] = 'fail';
      ctx.body = {
        msg: 'fail',
        data: '删除失败！请尝试刷新界面！'
      };
    }
  } else {
    log_infos['result'] = 'fail';
    log_infos['reason'] = '权限不足';
    ctx.body = {
      msg: 'fail',
      data: '您没有权限删除！'
    };
  }
  log2db(log_infos);
};
const deleteUsers = async (ctx, next) => {
  const authName = 'edituser';
  const { operator, ids } = ctx.request.body;
  const isAllow = await checkAuth(operator, authName);
  let finishedIds = [];
  let unfinishedIds = [];
  let errIds = [];
  for (let id of ids) {
    const { username } = await User.findOne({
      attributes: ['username'],
      where: { id },
      raw: true
    });
    const enoughWeight = await judgeAuth(operator, username);
    if (enoughWeight && isAllow) {
      const ret = await User.destroy({ where: { id } });
      if (ret) {
        finishedIds.push(id);
      } else {
        errIds.push(id);
      }
    } else {
      unfinishedIds.push(id);
    }
  }
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'delete',
    target: ids.join(','),
    operator,
    result: 'success',
    remark: `${finishedIds.join(',')}删除成功，${errIds.join(',')}删除出错，${unfinishedIds.join(',')}删除失败`
  };
  log2db(log_infos);
  ctx.body = {
    msg: 'success',
    data: `批量删除执行成功！`,
    finishedIds,
    errIds,
    unfinishedIds
  };
};
const addUser = async (ctx, next) => {
  const authName = 'edituser';
  const { operator, formData } = ctx.request.body;
  const { role: operatorRole } = await User.findOne({
    where: { username: operator },
    raw: true,
    attributes: ['role']
  });

  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'increase',
    target: formData.userName,
    operator
  };

  const enoughWeight = await compareWeight(operatorRole, formData.role);
  const isAllow = await checkAuth(operator, authName);

  if (enoughWeight && isAllow) {
    if (formData.checkPass !== formData.pass) {
      ctx.body = {
        msg: 'fail',
        data: '两次输入的密码不一致！'
      };
    } else {
      try {
        await User.create({
          username: formData.userName,
          password: encrypt(formData.pass),
          role: formData.role
        });
        log_infos['result'] = 'success';
        log_infos['remark'] = `用户：${formData.userName}`;
        ctx.body = {
          msg: 'success',
          data: `用户${formData.userName}添加成功！`
        };
      } catch (error) {
        log_infos['result'] = 'error';
        log_infos['reason'] = `重复注册`;
        ctx.status = 200;
        ctx.body = {
          msg: 'fail',
          data: '请不要反复注册!'
        };
      }
    }
    log2db(log_infos);
    return;
  }
  log_infos['result'] = 'fail';
  log_infos['reason'] = '权限不足';
  log2db(log_infos);
  ctx.body = {
    msg: 'fail',
    data: '权限不足！'
  };
};

module.exports = {
  getUsers,
  editUser,
  deleteUser,
  deleteUsers,
  addUser
};
