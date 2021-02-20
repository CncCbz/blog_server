const Router = require('koa-router');

const {
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
  getVidoUrl,
  issueArtice
} = require('../controller');

const router = new Router();

const routes = router.routes();

router.post('/register', register);
router.post('/login', login);
router.post('/getroles', getRoles);
router.post('/getusers', getUsers);
router.post('/edituser', editUser);
router.post('/deleteuser', deleteUser);
router.post('/deleteusers', deleteUsers);
router.post('/adduser', addUser);
router.post('/ghsconfig', getGhsConfig);
router.post('/ghsvideolist', getVideoList);
router.post('/ghsvideourl', getVidoUrl);
router.post('/issuearticle', issueArtice);

module.exports = {
  router,
  routes
};
