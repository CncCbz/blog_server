const Router = require('koa-router');

const { image } = require('../middleware');

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
  issueArtice,
  getArticleList,
  deleteArticle,
  getArticle,
  updateArticle,
  saveDraft,
  getDraft,
  deleteDraft,
  uploadImg,
  getLogs,
  getVisitorInfos
} = require('../controller');

const router = new Router();

const routes = router.routes();

router.post('/register', register);
router.post('/login', login);

router.post('/getroles', getRoles);

router.post('/user/list', getUsers);
router.post('/user/edit', editUser);
router.post('/user/delete', deleteUser);
router.post('/user/deletes', deleteUsers);
router.post('/user/add', addUser);

router.post('/ghs/config', getGhsConfig);
router.post('/ghs/videolist', getVideoList);
router.post('/ghs/videourl', getVidoUrl);

router.post('/article/issue', issueArtice);
router.post('/article/list', getArticleList);
router.post('/article/delete', deleteArticle);
router.post('/article/get', getArticle);
router.post('/article/update', updateArticle);
router.post('/draft/save', saveDraft);
router.post('/draft/get', getDraft);
router.post('/draft/delete', deleteDraft);

router.post('/upload/image', image.single('image'), uploadImg);

router.post('/log/list', getLogs);

router.get('/home/visitors', getVisitorInfos);

module.exports = {
  router,
  routes
};
