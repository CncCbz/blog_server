const CORS_CONFIG = {
  origin: () => 'http://106.55.20.150:8081',
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'] //设置服务器支持的所有头信息字段
};

module.exports = {
  CORS_CONFIG
};
