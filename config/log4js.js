const LOG4JS_CONFIG = {
  appenders: {
    out: {
      type: 'console'
    },
    error: {
      type: 'file', //日志类型
      category: 'errLogger', //日志名称
      filename: __dirname + '/../logs/error.log/', //日志输出位置，当目录文件或文件夹不存在时自动创建
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100 //当文件内容超过文件存储空间时，备份文件的数量
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: __dirname + '/../logs/responses/',
      pattern: 'yyyy-MM-dd.log', //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    out: { appenders: ['out'], level: 'info' },
    error: { appenders: ['out', 'error'], level: 'error' },
    response: { appenders: ['response'], level: 'info' },
    default: { appenders: ['response'], level: 'info' }
  },
  replaceConsole: true
};

module.exports = {
  LOG4JS_CONFIG
};
