//数据库日志
const { Log, Visitor } = require('../model');

const log2db = info => {
  Log.create(info, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
};

const visitorLog = info => {
  Visitor.create(info, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  log2db,
  visitorLog
};
