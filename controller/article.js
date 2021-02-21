const fs = require('fs');
const path = require('path');
const { User, Authority, Article, Recycle } = require('../model');
const { checkAuth, judgeAuth, compareWeight } = require('../unit');
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
//获取文章列表
const getArticleList = async (ctx, next) => {
  const authName = 'listarticle';
  const { userName, curPage, limit } = ctx.request.body;
  const isAllow = checkAuth(userName, authName);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限访问!'
    };
    return;
  }
  const { role: userRole } = await User.findOne({
    where: { username: userName },
    attributes: ['role'],
    raw: true
  });
  if (!(await compareWeight(userRole, 'admin', true))) {
    await Article.findAll({
      where: { auther: userName },
      raw: true,
      attributes: ['auther', 'title', 'comment', 'tags', 'previewText', 'likes', 'createdAt', 'updatedAt'],
      limit,
      offset: limit * (curPage - 1)
    })
      .then(list => {
        ctx.body = {
          msg: 'success',
          data: '获取成功',
          list
        };
      })
      .catch(err => {
        ctx.body = {
          msg: 'success',
          data: '还未发布过文章，快去发布你的第一篇博客吧',
          list: []
        };
      });
    return;
  }
  await Article.findAll({
    raw: true,
    attributes: ['id', 'auther', 'title', 'comment', 'tags', 'previewText', 'likes', 'created_at', 'updated_at'],
    limit,
    offset: limit * (curPage - 1)
  })
    .then(list => {
      ctx.body = {
        msg: 'success',
        data: '获取成功',
        list
      };
    })
    .catch(err => {
      ctx.body = {
        msg: 'success',
        data: '数据库中没有任何文章！',
        list: []
      };
    });
};
//删除文章
const deleteArticle = async (ctx, next) => {
  const authName = 'addarticle';
  const { operator, id } = ctx.request.body;
  const { role: operatorRole } = await User.findOne({
    where: { username: operator },
    attributes: ['role'],
    raw: true
  });
  const articleInfo = await Article.findOne({
    where: { id },
    attributes: ['id', 'auther', 'title', 'comment', 'tags', 'previewText', 'likes', 'filepath'],
    raw: true
  });
  const isAllow = checkAuth(operator, authName);
  const isAdmin = await compareWeight(operatorRole, 'admin', true);
  const enoughWeight = await judgeAuth(operator, articleInfo.auther);
  if (isAllow && (operator === articleInfo.auther || (isAdmin && enoughWeight))) {
    await Recycle.create(articleInfo)
      .then(async res => {
        await Article.destroy({
          where: { id }
        });
        ctx.body = {
          msg: 'success',
          data: `${articleInfo.title}已删除！`
        };
      })
      .catch(err => {
        ctx.body = {
          msg: 'fail',
          data: `删除出错！`
        };
        ctx.status = 400;
      });
    return;
  }
  ctx.body = {
    msg: 'fail',
    data: '没有删除权限！'
  };
};
//获取文章
const getArticle = async (ctx, next) => {
  const authName = 'article';
  const { operator, id } = ctx.request.body;
  const isAllow = checkAuth(operator, authName);
  const articleInfo = await Article.findOne({
    where: { id },
    raw: true,
    attributes: ['id', 'auther', 'title', 'tags', 'previewText', 'filepath']
  });
  if (operator === articleInfo.auther && isAllow) {
    const text = fs.readFileSync(path.join(__dirname, articleInfo.filepath), 'utf-8');
    articleInfo['text'] = text;
    delete articleInfo.filepath;
    ctx.body = {
      msg: 'success',
      data: '文章获取成功！',
      articleInfo
    };
    return;
  }
  ctx.body = {
    msg: 'fail',
    data: '没有操作权限！'
  };
};
//更新文章
const updateArticle = async (ctx, next) => {
  const authName = 'addarticle';
  const { operator, article } = ctx.request.body;
  const isAllow = checkAuth(operator, authName);
  const { auther, filepath } = await Article.findOne({
    where: { id: article.id },
    raw: true,
    attributes: ['auther', 'filepath']
  });
  const isInPerson = operator === auther;
  if (isAllow && isInPerson) {
    const id = article.id;
    delete article.id;
    await Article.update(article, {
      where: { id }
    });
    fs.writeFileSync(path.join(__dirname, filepath), article.text);
    ctx.body = {
      mes: 'success',
      data: `《${article.title}》更新成功`
    };
    return;
  }
  ctx.body = {
    mes: 'fail',
    data: '没有操作权限！'
  };
};

module.exports = {
  issueArtice,
  getArticleList,
  deleteArticle,
  getArticle,
  updateArticle
};
