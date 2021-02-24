const { check, compare } = require('../utils');
const { User, Authority } = require('../model');

const login = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // const check_result = check(ctx)(userName, password);
  // if (!check_result) return;

  const user = await User.findOne({
    where: { username: userName }
  });
  if (!user) {
    ctx.body = {
      msg: 'fail',
      data: '用户名不存在！'
    };
    return;
  }
  const role = user.role;
  const auth = await Authority.findOne({
    where: { role: role }
  });
  const psw_compare_result = compare(password, user.password);
  if (psw_compare_result) {
    ctx.body = {
      msg: 'success',
      data: '用户登陆成功！',
      token: ctx.jwt.sign(
        {
          data: userName
        },
        ctx.jwt.secret
      ),
      userName,
      role,
      authority: auth.dataValues
    };
  } else {
    ctx.body = {
      msg: 'fail',
      data: '用户名或密码错误'
    };
  }
};

module.exports = {
  login
};
