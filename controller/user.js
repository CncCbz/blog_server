const { User, Authority } = require('../model');
const { checkAuth, encrypt, judgeAuth, compareWeight } = require('../unit');
const getUsers = async (ctx, next) => {
  const authName = 'listuser';
  const { userName } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const users = await User.findAll({ raw: true });
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
  const isAllow = await checkAuth(operator, authName);
  const enoughWeight = await judgeAuth(operator, username);
  if (isAllow && enoughWeight) {
    delete formData.id;
    const ret = await User.update(formData, { where: { id } });
    if (ret[0]) {
      ctx.body = {
        msg: 'success',
        data: '更新成功！'
      };
    } else {
      ctx.body = {
        msg: 'fail',
        data: '更新失败！您没有改动！'
      };
    }
  } else {
    ctx.body = {
      msg: 'fail',
      data: '您没有权限编辑！'
    };
  }
};
const deleteUser = async (ctx, next) => {
  const authName = 'edituser';
  const { operator, id } = ctx.request.body;
  const { username } = await User.findOne({
    attributes: ['username'],
    where: { id },
    raw: true
  });
  const isAllow = await checkAuth(operator, authName);
  const enoughWeight = await judgeAuth(operator, username);
  if (isAllow && enoughWeight) {
    const ret = await User.destroy({ where: { id } });
    if (ret) {
      ctx.body = {
        msg: 'success',
        data: '删除成功！'
      };
    } else {
      ctx.body = {
        msg: 'fail',
        data: '删除失败！请尝试刷新界面！'
      };
    }
  } else {
    ctx.body = {
      msg: 'fail',
      data: '您没有权限删除！'
    };
  }
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
        ctx.body = {
          msg: 'success',
          data: `用户${formData.userName}添加成功！`
        };
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          msg: 'fail',
          data: '请不要反复注册!'
        };
      }
    }
    return;
  }
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
