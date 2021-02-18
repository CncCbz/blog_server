const { Sequelize } = require('sequelize');
const { SEQUELIZE_CONFIG } = require('../config');

const define_schema_user = (db, Sequelize) => {
  const users = db.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true, //自增
        comment: '自增id' //注释：只在代码中有效
      },
      //用户名
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      //密码
      password: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      //角色
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
      },
      //创建时间
      create_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
  users.sync();
  // //先删除后同步
  // users.sync({
  //   force: true
  // });
  return users;
};

module.exports = {
  define_schema_user
};
