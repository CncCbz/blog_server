//数据库日志
const { Log } = require('../model');

let log2db = info => {
  Log.create(info, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  log2db
};
