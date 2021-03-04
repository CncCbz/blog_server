const Sequelize = require('sequelize');

const { SEQUELIZE_CONFIG, MYSQL_CONFIG } = require('../config');

const { define_schema_user } = require('./user');
const { define_schema_auth } = require('./authority');
const { define_schema_article } = require('./article');
const { define_schema_recycle } = require('./recycle');
const { define_schema_log } = require('./log');
const { define_schema_visitor } = require('./visitors');
const { define_schema_article_comment, define_schema_reply_comment } = require('./comment');

const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.username, MYSQL_CONFIG.password, SEQUELIZE_CONFIG);

const User = define_schema_user(sequelize, Sequelize);
const Authority = define_schema_auth(sequelize, Sequelize);
const Article = define_schema_article(sequelize, Sequelize);
const Recycle = define_schema_recycle(sequelize, Sequelize);
const Log = define_schema_log(sequelize, Sequelize);
const Visitor = define_schema_visitor(sequelize, Sequelize);
const Article_comment = define_schema_article_comment(sequelize, Sequelize);
const Reply_comment = define_schema_reply_comment(sequelize, Sequelize);

module.exports = {
  User,
  Authority,
  Article,
  Recycle,
  Log,
  Visitor,
  Article_comment,
  Reply_comment
};
