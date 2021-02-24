const SEQUELIZE_CONFIG = {
  dialect: 'mysql',
  port: '3306',
  host: 'localhost',
  //中国时区
  timezone: '+08:00',
  define: {
    //取消数据表名复数
    freezeTableName: true,
    //自动写入时间戳
    timestamps: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    //所有驼峰命名格式
    underscored: true
  },
  logging: false
};

module.exports = {
  SEQUELIZE_CONFIG
};
