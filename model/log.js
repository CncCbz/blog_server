//日志
const define_schema_log = (db, Sequelize) => {
  const logs = db.define(
    'log',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true, //自增
        comment: '自增id' //注释：只在代码中有效
      },
      //操作者
      operator: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      //ip地址
      ip: {
        type: Sequelize.STRING(32),
        allowNull: true,
        defaultValue: ''
      },
      //操作类型
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //操作信息
      operation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //目标用户
      target: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      //操作结果
      result: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //失败原因
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      //备注
      remark: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      //操作时间
      operateAt: {
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
  logs.sync();
  // //先删除后同步
  // logs.sync({
  //   force: true
  // });
  return logs;
};

module.exports = {
  define_schema_log
};
