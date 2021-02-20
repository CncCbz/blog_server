const fs = require('fs');
const path = require('path');
const { User, Authority, Article } = require('../model');
const { checkAuth, encrypt, judgeAuth, compareWeight } = require('../unit');
//发布文章
const issueArtice = async (ctx, next) => {
  const authName = 'addarticle';
  const { userName, article } = ctx.request.body;
  const isAllow = checkAuth(userName, authName);
  if (!isAllow) {
    ctx.body = {
      mes: 'fail',
      data: '您没有权限发布文章！'
    };
    return;
  }
  const { title, tags, prevText, text } = article;
  if (title === '' || text === '') {
    ctx.body = {
      mes: 'fail',
      data: '标题或内容不能为空！'
    };
    return;
  }
  const now = new Date().getTime();
  const filepath = `../blogs/${now}.md`;
  //判断标题是否已存在
  const notRepeat = await Article.findOne({
    where: { title },
    attributes: ['id'],
    raw: true
  });
  if (notRepeat !== null) {
    ctx.body = {
      mes: 'fail',
      data: '标题重复！'
    };
    return;
  }
  const ret = await Article.create({
    auther: userName,
    title,
    tags,
    text,
    previewText: prevText,
    filepath
  });
  await fs.writeFile(path.join(__dirname, filepath), article.text, function (err) {
    if (err) {
      console.log(err);
    }
  });
  ctx.body = {
    mes: 'success',
    data: `《${ret.title}》发布成功！`
  };
};

module.exports = {
  issueArtice
};
