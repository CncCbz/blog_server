//文章评论表
const define_schema_article_comment = (db, Sequelize) => {
  const article_comments = db.define(
    'article_comment',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true, //自增
        comment: '自增id' //注释：只在代码中有效
      },
      //被评论的文章id
      articleId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //被评论的文章标题
      articleTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //文章作者id
      autherId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //文章作者名
      autherName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //评论者id
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //评论者的昵称
      userName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '未知用户'
      },
      //评论者的角色
      userRole: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
      },
      //评论内容
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //评论时间
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      //点赞数
      likes: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
      },
      //评论状态(是否被删除)
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      //删除时间
      deleteAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      //是否被置顶
      top_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      //是否被举报
      isReported: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      //使用自定义表名
      freezeTableName: true,
      //去掉默认的添加时间和更新时间
      timestamps: false
    }
  );

  //同步:没有就新建，有就不变
  article_comments.sync();
  // //先删除后同步
  // articles.sync({
  //   force: true
  // });
  return article_comments;
};

//回复评论表
const define_schema_reply_comment = (db, Sequelize) => {
  const reply_comments = db.define(
    'reply_comment',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true, //自增
        comment: '自增id' //注释：只在代码中有效
      },
      //被回复的评论id
      replyId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //被回复用户昵称
      replyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      replyContent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      //文章id
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      articleTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //用户id
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //用户昵称
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '未知用户'
      },
      //用户角色
      userRole: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
      },
      //评论内容
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //评论时间
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      //点赞数
      likes: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
      },
      //评论状态(是否被删除)
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      //删除时间
      deleteAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      //是否被举报
      isReported: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      //使用自定义表名
      freezeTableName: true,
      //去掉默认的添加时间和更新时间
      timestamps: false
    }
  );

  //同步:没有就新建，有就不变
  reply_comments.sync();
  // //先删除后同步
  // articles.sync({
  //   force: true
  // });
  return reply_comments;
};
module.exports = {
  define_schema_article_comment,
  define_schema_reply_comment
};
