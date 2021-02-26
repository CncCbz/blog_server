const { User, Visitor } = require('../model');
const { checkAuth, compareWeight } = require('../utils');

const getVisitorInfos = async (ctx, next) => {
  let dates = await Visitor.findAll({
    attributes: ['date'],
    group: 'date',
    raw: true
  });
  dates = dates.map(i => i.date);
  let visits = Array(dates.length).fill(0);
  let issues = Array(dates.length).fill(0);
  const { count: visitorCount, rows: visitorDate } = await Visitor.findAndCountAll({
    where: { type: 'login' },
    attributes: ['date'],
    group: 'date',
    raw: true
  });
  for (let i = 0; i < visitorDate.length; i++) {
    for (let j = 0; j < dates.length; j++) {
      if (visitorDate[i].date === dates[j]) {
        visits[j] = visitorCount[i].count;
      }
    }
  }
  const { count: issueCount, rows: issueDate } = await Visitor.findAndCountAll({
    where: { type: 'issue' },
    attributes: ['date'],
    group: 'date',
    raw: true
  });
  for (let i = 0; i < issueCount.length; i++) {
    for (let j = 0; j < dates.length; j++) {
      if (issueDate[i].date === dates[j]) {
        issues[j] = issueCount[i].count;
      }
    }
  }
  ctx.body = {
    msg: 'success',
    data: '访问成功',
    dates,
    visits,
    issues
  };
};

module.exports = {
  getVisitorInfos
};
