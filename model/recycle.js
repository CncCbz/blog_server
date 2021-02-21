//文章回收站
const define_schema_recycle = (db, Sequelize) => {
  const recycles = db.define(
    'recycle',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        unique: true
      },
      //作者
      auther: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      //标题
      title: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true
      },
      //评论
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      //标签
      tags: {
        type: Sequelize.STRING,
        allowNull: true
      },
      previewText: {
        type: Sequelize.STRING,
        defaultValue: '没有预览内容！'
      },
      //点赞
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      //文章地址
      filepath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CreatedAt: {
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
  recycles.sync();
  // //先删除后同步
  // recycles.sync({
  //   force: true
  // });
  return recycles;
};

module.exports = {
  define_schema_recycle
};
