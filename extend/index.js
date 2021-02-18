const extend_ctx = (name, props) => async (ctx, next) => {
  ctx[name] = props;
  await next();
};

module.exports = {
  extend_ctx
};
