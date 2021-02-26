//访问日志
const define_schema_visitor = (db, Sequelize) => {
  const visitors = db.define(
    'visitor',
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
      //操作
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //操作日期
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //操作时间
      time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //创建时间
      createdAt: {
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
  visitors.sync();
  // //先删除后同步
  // visitors.sync({
  //   force: true
  // });
  return visitors;
};

module.exports = {
  define_schema_visitor
};
