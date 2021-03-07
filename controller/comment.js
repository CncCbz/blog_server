const { User, Reply_comment, Article_comment, Article } = require('../model');
const { checkAuth, compareWeight, judgeAuth } = require('../utils');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const getComments = async (ctx, next) => {
  const authName = 'comment';
  let { userName, filter, sort, limit, curPage } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  const { role: userRole, id: userId } = await User.findOne({
    where: { username: userName },
    raws: true
  });
  const isAdmin = await compareWeight(userRole, 'admin', true);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限'
    };
    return;
  }
  //排序
  let order = [];
  for (let key in sort) {
    let arr = [];
    arr.push(key);
    if (sort[key] === 'descending') {
      arr.push('DESC');
    }
    order.push(arr);
  }
  for (let key in filter) {
    if (key === 'articleTitle' || key === 'userName' || key === 'content' || key === 'autherName') {
      let val = filter[key];
      filter[key] = { [Op.substring]: val };
    }
  }
  if (!isAdmin) {
    //不显示被删除的评论
    filter = Object.assign(filter, { isDeleted: false, autherId: userId });
    const { count, rows } = await Article_comment.findAndCountAll({
      order,
      where: filter,
      raws: true,
      attributes: {
        include: [
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('delete_at'), '%Y-%m-%d %H:%i:%s'), 'deleteAt']
        ]
      },
      limit,
      offset: limit * (curPage - 1)
    });
    ctx.body = {
      msg: 'success',
      data: '访问成功！',
      count,
      comments: rows
    };
    return;
  }
  // filter = Object.assign(filter, { autherId: userId });
  const { count, rows } = await Article_comment.findAndCountAll({
    order,
    where: filter,
    raws: true,
    attributes: {
      include: [
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('delete_at'), '%Y-%m-%d %H:%i:%s'), 'deleteAt']
      ]
    },
    limit,
    offset: limit * (curPage - 1)
  });
  ctx.body = {
    msg: 'success',
    data: '访问成功！',
    count,
    comments: rows
  };
};
const setTopStatus = async (ctx, next) => {
  const authName = 'comment';
  const { userName, status: top_status, id, articleId } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  const { auther } = await Article.findOne({
    where: { id: articleId },
    raws: true,
    attributes: ['auther']
  });
  if (!isAllow || auther !== userName) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限！'
    };
    return;
  }
  try {
    if (top_status) {
      await Article_comment.update(
        { top_status: false },
        {
          where: { top_status: true, articleId }
        }
      );
    }
    await Article_comment.update(
      { top_status },
      {
        where: { id, articleId }
      }
    );
    ctx.body = {
      msg: 'success',
      data: '修改成功！'
    };
  } catch {
    ctx.body = {
      msg: 'fail',
      data: '修改失败！'
    };
  }
};
//删除与恢复
const deleteComment = async (ctx, next) => {
  const authName = 'comment';
  const { userName, targetName, isDeleted, id, articleId } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限！'
    };
    return;
  }
  try {
    var { auther } = await Article.findOne({
      where: { id: articleId },
      raws: true,
      attributes: ['auther']
    });
  } catch {
    ctx.body = {
      msg: 'fail',
      data: '文章已被删除，无法恢复！'
    };
    return;
  }

  const enoughWeight = await judgeAuth(userName, targetName);
  if (enoughWeight || auther === userName) {
    try {
      if (isDeleted) {
        const date = new Date();
        await Article_comment.update({ isDeleted, deleteAt: date }, { where: { id } });
        await Reply_comment.update({ isDeleted, deleteAt: date }, { where: { replyId: id } });
      } else {
        await Article_comment.update({ isDeleted, deleteAt: null }, { where: { id } });
        await Reply_comment.update({ isDeleted, deleteAt: null }, { where: { replyId: id } });
      }
      ctx.body = {
        msg: 'success',
        data: '操作成功！'
      };
    } catch {
      ctx.body = {
        msg: 'fail',
        data: '操作失败！'
      };
    }
    return;
  }
  ctx.body = {
    msg: 'fail',
    data: '权限不足！'
  };
};

//以下为回复相关
const getReply = async (ctx, next) => {
  const authName = 'comment';
  let { userName, filter, sort, limit, curPage } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  const { role: userRole, id: userId } = await User.findOne({
    where: { username: userName },
    raws: true
  });
  const isAdmin = await compareWeight(userRole, 'admin', true);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限'
    };
    return;
  }
  //排序
  let order = [];
  for (let key in sort) {
    let arr = [];
    arr.push(key);
    if (sort[key] === 'descending') {
      arr.push('DESC');
    }
    order.push(arr);
  }
  for (let key in filter) {
    if (key === 'replyContent' || key === 'userName' || key === 'content' || key === 'replyName' || key === 'articleTitle') {
      let val = filter[key];
      filter[key] = { [Op.substring]: val };
    }
  }
  if (!isAdmin) {
    //不显示被删除的评论
    filter = Object.assign(filter, { isDeleted: false, replyName: userName });
    const { count, rows } = await Reply_comment.findAndCountAll({
      order,
      where: filter,
      raws: true,
      attributes: {
        include: [
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('delete_at'), '%Y-%m-%d %H:%i:%s'), 'deleteAt']
        ]
      },
      limit,
      offset: limit * (curPage - 1)
    });
    ctx.body = {
      msg: 'success',
      data: '访问成功！',
      count,
      replys: rows
    };
    return;
  }
  const { count, rows } = await Reply_comment.findAndCountAll({
    order,
    where: filter,
    raws: true,
    attributes: {
      include: [
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('delete_at'), '%Y-%m-%d %H:%i:%s'), 'deleteAt']
      ]
    },
    limit,
    offset: limit * (curPage - 1)
  });
  ctx.body = {
    msg: 'success',
    data: '访问成功！',
    count,
    replys: rows
  };
};
//删除与恢复
const deleteReply = async (ctx, next) => {
  const authName = 'comment';
  const { userName, targetName, isDeleted, id, replyId } = ctx.request.body;
  const isAllow = await checkAuth(userName, authName);
  if (!isAllow) {
    ctx.body = {
      msg: 'fail',
      data: '没有权限！'
    };
    return;
  }
  //判断父评论是否被删除
  const { isDeleted: isNotExist } = await Article_comment.findOne({
    where: { id: replyId },
    raws: true,
    attributes: ['isDeleted']
  });
  if (isNotExist) {
    ctx.body = {
      msg: 'fail',
      data: '评论已被删除，无法恢复！'
    };
    return;
  }

  const enoughWeight = await judgeAuth(userName, targetName);
  if (enoughWeight || targetName === userName) {
    try {
      if (isDeleted) {
        const date = new Date();
        await Reply_comment.update({ isDeleted, deleteAt: date }, { where: { id } });
      } else {
        await Reply_comment.update({ isDeleted, deleteAt: null }, { where: { id } });
      }
      ctx.body = {
        msg: 'success',
        data: '操作成功！'
      };
    } catch {
      ctx.body = {
        msg: 'fail',
        data: '操作失败！'
      };
    }
    return;
  }
  ctx.body = {
    msg: 'fail',
    data: '权限不足！'
  };
};
module.exports = {
  getComments,
  setTopStatus,
  deleteComment,
  getReply,
  deleteReply
};
