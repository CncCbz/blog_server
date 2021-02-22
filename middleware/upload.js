const multer = require('koa-multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img'); // 储存路径
  },
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split('.'); // 获取文件后缀
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]); // 生成文件
  }
});

var image = multer({ storage: storage });

module.exports = {
  image
};
