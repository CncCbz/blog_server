const { login } = require('./login');
const { register } = require('./register');
const { getRoles } = require('./role');
const { getUsers, editUser, deleteUser, deleteUsers, addUser } = require('./user');
const { getGhsConfig, getVideoList, getVidoUrl } = require('./ghs');
const { issueArtice, getArticleList, deleteArticle, getArticle, updateArticle } = require('./article');
const { uploadImg } = require('./upload');
const { getLogs } = require('./log');
const { getVisitorInfos } = require('./home');

module.exports = {
  //登录注册
  register,
  login,
  //用户
  getRoles,
  getUsers,
  editUser,
  deleteUser,
  deleteUsers,
  addUser,
  //ghs
  getGhsConfig,
  getVideoList,
  getVidoUrl,
  //文章
  issueArtice,
  getArticleList,
  deleteArticle,
  getArticle,
  updateArticle,
  //文件上传
  uploadImg,
  //日志
  getLogs,
  //首页
  getVisitorInfos
};
