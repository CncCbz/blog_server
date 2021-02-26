let formatError = (ctx, err, costTime) => {
  let ip = ctx.request.ip.replace(/^:.*:/g, '');
  let method = ctx.method;
  let url = ctx.url;
  let body = ctx.request.body;
  let userAgent = ctx.header.userAgent;
  return { id, method, url, body, costTime, err };
};
let formatRes = (ctx, costTime) => {
  let ip = ctx.request.ip.replace(/^:.*:/g, '');
  let method = ctx.method;
  let url = ctx.url;
  let body = ctx.request.body;
  let response = ctx.response;
  return { ip, method, url, body, costTime, response };
};
let formatOut = (ctx, costTime) => {
  let ip = ctx.request.ip.replace(/^:.*:/g, '');
  let method = ctx.method;
  let url = ctx.url;
  let body = ctx.request.body;
  let response = ctx.response;
  return `${ip} -> ${method} -> ${url} -> ${response.status} -> cost:${costTime}ms`;
};

module.exports = { formatError, formatRes, formatOut };
