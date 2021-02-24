const axios = require('axios');
const { ghsConfig, ghsList } = require('../config');
const { checkAuth, judgeAuth } = require('../utils');

const config = ghsConfig();
const list = ghsList();

const getGhsConfig = async (ctx, next) => {
  ctx.body = {
    msg: 'success',
    data: '读取成功！',
    config
  };
};

const getVideoList = async (ctx, next) => {
  const authName = 'ghs';
  const { name, userName, type, limit } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const urls = list[list.findIndex(item => item.name === name)].types;
    const URL = urls[urls.findIndex(item => item.title === type)].url;
    const { data: resp } = await axios.get(encodeURI(`${URL}&limit=${limit}`));
    ctx.body = {
      msg: 'success',
      data: '查看许可！',
      videos: resp.list
    };
  } else {
    ctx.body = {
      msg: 'fail',
      data: '您没有权限查看！'
    };
  }
};

const getVidoUrl = async (ctx, next) => {
  const authName = 'ghs';
  const { id, userName, name } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const { baseurl } = list[list.findIndex(item => item.name === name)];
    const { data: resp } = await axios.get(encodeURI(`${baseurl}?vod_id=${id}`));
    ctx.body = {
      msg: 'success',
      data: '获取成功！',
      infos: resp.info
    };
  } else {
    ctx.body = {
      msg: 'fail',
      data: '您没有权限查看！'
    };
  }
};

module.exports = {
  getGhsConfig,
  getVideoList,
  getVidoUrl
};
