const error_handler = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        msg: 'fail',
        data: '404 NOT FOUND'
      };
      ctx.status = 404;
    }
  } catch (err) {
    const status = err.status || 500;
    const error = ctx.status === 500 && ctx.env === 'prod' ? 'Interval Server Error' : err.msg;
    ctx.body = {
      msg: 'fail',
      data: error
    };
    ctx.status = status;
  }
};

module.exports = {
  error_handler
};
