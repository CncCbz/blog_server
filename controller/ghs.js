const axios = require('axios');
const { ghsConfig, ghsList } = require('../config');
const { checkAuth, judgeAuth } = require('../utils');
const { log2db } = require('../utils');

const log_type = 'ghs';
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

  //log info
  let log_infos = {
    type: log_type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'list',
    target: userName,
    operator: userName
  };

  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const urls = list[list.findIndex(item => item.name === name)].types;
    const URL = urls[urls.findIndex(item => item.title === type)].url;
    const { data: resp } = await axios.get(encodeURI(`${URL}&limit=${limit}`));
    log_infos['result'] = 'success';
    log_infos['remark'] = type;
    ctx.body = {
      msg: 'success',
      data: '查看许可！',
      videos: resp.list
    };
  } else {
    log_infos['result'] = 'fail';
    log_infos['reason'] = '权限不足';
    ctx.body = {
      msg: 'fail',
      data: '您没有权限查看！'
    };
  }
  log2db(log_infos);
};

const getVidoUrl = async (ctx, next) => {
  const authName = 'ghs';
  const { id, userName, name } = ctx.request.body;
  //log info
  let log_infos = {
    type: log_type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'video',
    target: `${name}-${id}`,
    operator: userName
  };
  const isAllow = await checkAuth(userName, authName);
  if (isAllow) {
    const { baseurl } = list[list.findIndex(item => item.name === name)];
    const { data: resp } = await axios.get(encodeURI(`${baseurl}?vod_id=${id}`));
    log_infos['result'] = 'success';
    log_infos['remark'] = resp.info.vod_name;
    ctx.body = {
      msg: 'success',
      data: '获取成功！',
      infos: resp.info
    };
  } else {
    log_infos['result'] = 'fail';
    log_infos['reason'] = '权限不足';
    ctx.body = {
      msg: 'fail',
      data: '您没有权限查看！'
    };
  }
  log2db(log_infos);
};

module.exports = {
  getGhsConfig,
  getVideoList,
  getVidoUrl
};
