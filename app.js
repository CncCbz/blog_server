const Koa = require('koa');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const { router, routes } = require('./router');
const { extend_ctx } = require('./extend');
const { error_handler } = require('./middleware');
const { CORS_CONFIG, EVN_CONFIG, SEQUELIZE_CONFIG, SECRET_CONFIG } = require('./config');

const app = new Koa();
//扩展
app.use(extend_ctx('env', EVN_CONFIG));

//生成token
const extend_ctx_jwt = {
  ...jsonwebtoken,
  secret: SECRET_CONFIG
};
app.use(extend_ctx('jwt', extend_ctx_jwt));
//body解析
app.use(bodyparser());

//配置跨域
app.use(cors(CORS_CONFIG));

//错误统一处理
app.use(error_handler);
//校验token
app.use(
  jwt({ secret: SECRET_CONFIG }).unless({
    path: [/\/register/, /\/login/]
  })
);

//路由
router.get('/index', (ctx, next) => {
  ctx.body = '你好路由';
});

app.use(routes);

app.use(router.allowedMethods());

module.exports = {
  app
};
