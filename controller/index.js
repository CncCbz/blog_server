const { login } = require('./login');
const { register } = require('./register');
const { getRoles } = require('./role');
const { getUsers, editUser, deleteUser, deleteUsers, addUser } = require('./user');
const { getGhsConfig, getVideoList, getVidoUrl } = require('./ghs');

module.exports = {
  register,
  login,
  getRoles,
  getUsers,
  editUser,
  deleteUser,
  deleteUsers,
  addUser,
  getGhsConfig,
  getVideoList,
  getVidoUrl
};
