const { User, Authority } = require('../model');
const path = require('path');
const uploadImg = async (ctx, next) => {
  ctx.body = {
    msg: 'success',
    data: '访问成功！',
    url: path.join(__dirname, ctx.req.file.filename)
  };
};
module.exports = {
  uploadImg
};
