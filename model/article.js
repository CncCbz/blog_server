const define_schema_article = (db, Sequelize) => {
  const articles = db.define(
    'article',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true, //自增
        comment: '自增id' //注释：只在代码中有效
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
        allowNull: true,
        defaultValue: '',
        get() {
          return this.getDataValue('comment').split(',');
        },
        set(value) {
          return this.setDataValue('comment', value.join(','));
        }
      },
      //标签
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
          return this.getDataValue('tags').split(',');
        },
        set(value) {
          return this.setDataValue('tags', value.join(','));
        }
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
      }
    },
    {
      //使用自定义表名
      freezeTableName: true,
      //去掉默认的添加时间和更新时间
      timestamps: true,
      createdAt: 'CreatedAt', //自定义时间戳
      updatedAt: 'UpdatedAt' // 自定义时间戳
    }
  );

  //同步:没有就新建，有就不变
  articles.sync();
  // //先删除后同步
  // articles.sync({
  //   force: true
  // });
  return articles;
};

module.exports = {
  define_schema_article
};
