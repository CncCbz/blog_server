const fs = require('fs');
const path = require('path');
const { User, Authority, Article, Recycle } = require('../model');
const { checkAuth, judgeAuth, compareWeight } = require('../utils');
const { log2db } = require('../utils');

const type = 'article';

//发布文章
const issueArtice = async (ctx, next) => {
  const authName = 'addarticle';
  const { userName, article } = ctx.request.body;
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'increase',
    target: userName,
    operator: userName
  };

  const isAllow = checkAuth(userName, authName);
  if (!isAllow) {
    const reason = '权限不足';
    const result = 'fail';
    log_infos['result'] = result;
    log_infos['reason'] = reason;
    ctx.body = {
      mes: result,
      data: reason
    };
    log2db(log_infos);
    return;
  }
  const { title, tags, prevText, text } = article;
  if (title === '' || text === '') {
    const reason = '标题或内容不能为空！';
    const result = 'fail';
    log_infos['result'] = result;
    log_infos['reason'] = reason;
    ctx.body = {
      mes: result,
      data: reason
    };
    log2db(log_infos);
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
    const reason = '标题重复！';
    const result = 'fail';
    log_infos['result'] = result;
    log_infos['reason'] = reason;
    ctx.body = {
      mes: result,
      data: reason
    };
    log2db(log_infos);
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
  const result = 'success';
  log_infos['result'] = result;
  log_infos['remark'] = `《${ret.title}》`;
  log2db(log_infos);
  ctx.body = {
    mes: result,
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
    await Article.findAndCountAll({
      where: { auther: userName },
      raw: true,
      attributes: ['id', 'auther', 'title', 'comment', 'tags', 'previewText', 'likes', 'created_at', 'updated_at'],
      limit,
      offset: limit * (curPage - 1)
    })
      .then(ret => {
        if (ret.count === 0) {
          ctx.body = {
            msg: 'fail',
            data: '还未发布过文章，快去发布你的第一篇博客吧',
            list: [],
            total: 0
          };
          return;
        }
        ctx.body = {
          msg: 'success',
          data: '获取成功',
          list: ret.rows,
          total: ret.count
        };
      })
      .catch(err => {
        ctx.body = {
          msg: 'fail',
          data: '还未发布过文章，快去发布你的第一篇博客吧',
          list: [],
          total: 0
        };
      });
    return;
  }
  await Article.findAndCountAll({
    raw: true,
    attributes: ['id', 'auther', 'title', 'comment', 'tags', 'previewText', 'likes', 'created_at', 'updated_at'],
    limit,
    offset: limit * (curPage - 1)
  })
    .then(ret => {
      ctx.body = {
        msg: 'success',
        data: '获取成功',
        list: ret.rows,
        total: ret.count
      };
    })
    .catch(err => {
      ctx.body = {
        msg: 'success',
        data: '数据库中没有任何文章！',
        list: [],
        total: 0
      };
    });
};
//删除文章
const deleteArticle = async (ctx, next) => {
  const authName = 'addarticle';
  const { operator, id } = ctx.request.body;
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'delete',
    operator: operator
  };
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
  log_infos['remark'] = `《${articleInfo.title}》`;
  log_infos['target'] = articleInfo.auther;
  const isAllow = checkAuth(operator, authName);
  const isAdmin = await compareWeight(operatorRole, 'admin', true);
  const enoughWeight = await judgeAuth(operator, articleInfo.auther);
  if (isAllow && (operator === articleInfo.auther || (isAdmin && enoughWeight))) {
    await Recycle.create(articleInfo)
      .then(async res => {
        await Article.destroy({
          where: { id }
        });
        log_infos['result'] = 'success';
        ctx.body = {
          msg: 'success',
          data: `${articleInfo.title}已删除！`
        };
      })
      .catch(err => {
        log_infos['result'] = 'error';
        log_infos['reason'] = '程序执行出错';
        ctx.body = {
          msg: 'fail',
          data: `删除出错！`
        };
        ctx.status = 400;
      });
    log2db(log_infos);
    return;
  }
  log_infos['result'] = 'fail';
  log_infos['reason'] = '没有权限';
  log2db(log_infos);
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
  const { auther, filepath, title } = await Article.findOne({
    where: { id: article.id },
    raw: true,
    attributes: ['auther', 'filepath', 'title']
  });
  //log info
  let log_infos = {
    type,
    ip: ctx.request.ip.replace(/^:.*:/g, ''),
    operation: 'update',
    operator: operator,
    remark: `《${title}》`,
    target: auther
  };
  const isInPerson = operator === auther;
  if (isAllow && isInPerson) {
    const id = article.id;
    delete article.id;
    await Article.update(article, {
      where: { id }
    })
      .then(ret => {
        fs.writeFileSync(path.join(__dirname, filepath), article.text);
        log_infos['remark'] = `《${article.title}》`;
        log_infos['result'] = 'success';
        log2db(log_infos);
        ctx.body = {
          mes: 'success',
          data: `《${article.title}》更新成功`
        };
      })
      .catch(err => {
        log_infos['result'] = 'fail';
        log_infos['reason'] = '文章标题重复';
        log2db(log_infos);
        ctx.body = {
          mes: 'fail',
          data: `文章标题已存在！`
        };
      });

    return;
  }
  log_infos['result'] = 'fail';
  log_infos['reason'] = '权限不足';
  log2db(log_infos);
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
