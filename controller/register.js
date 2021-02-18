const { check, encrypt } = require('../unit');
const { User } = require('../model');

const register = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  const check_result = check(ctx)(userName, password);
  if (!check_result) return;

  try {
    await User.create({
      username: userName,
      password: encrypt(password)
    });
    ctx.body = {
      msg: 'success',
      data: '注册成功！'
    };
  } catch (error) {
    ctx.status = 200;
    ctx.body = {
      msg: 'fail',
      data: '请不要反复注册!'
    };
  }
};

module.exports = {
  register
};
