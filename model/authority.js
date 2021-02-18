const { Sequelize } = require('sequelize');
const { SEQUELIZE_CONFIG } = require('../config');

/**
 * 权限控制
 */
const define_schema_auth = (db, Sequelize) => {
  const auths = db.define(
    'authority',
    {
      role: {
        type: Sequelize.STRING,
        primaryKey: true //主键
      },
      //角色名称
      rolename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //首页
      home: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //文章管理
      article: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //添加文章
      addarticle: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //文章列表
      listarticle: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //用户管理
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //添加用户
      adduser: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      edituser: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //用户列表
      listuser: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //博客日志
      log: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //留言管理
      comment: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //ghs
      ghs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      //权重
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  auths.sync();
  // //先删除后同步
  // users.sync({
  //   force: true
  // });
  return auths;
};

module.exports = {
  define_schema_auth
};
