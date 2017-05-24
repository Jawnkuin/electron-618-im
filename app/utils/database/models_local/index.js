/* eswlint-disable */
const Sequelize = require('sequelize');

const getConfig = require('../../../configs').getLocalDbConfig;

const departmentinfo = require('./departmentinfo');
const fileTransferMsg = require('./fileTransferMsg');
const groupinfo = require('./groupinfo');
const immessage = require('./immessage');
const recentSessionInfo = require('./recentSessionInfo');
const userinfo = require('./userinfo');

const env = process.env.NODE_ENV || 'development';
const db = {};


const getDb = () => {
  const config = getConfig()[env];
  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  const departmentinfoModel = departmentinfo(sequelize, Sequelize);
  const fileTransferMsgModel = fileTransferMsg(sequelize, Sequelize);
  const groupinfoModel = groupinfo(sequelize, Sequelize);
  const immessageModel = immessage(sequelize, Sequelize);
  const recentSessionInfoModel = recentSessionInfo(sequelize, Sequelize);
  const userinfoModel = userinfo(sequelize, Sequelize);

  db[departmentinfoModel.name] = departmentinfoModel;
  db[fileTransferMsgModel.name] = fileTransferMsgModel;
  db[groupinfoModel.name] = groupinfoModel;
  db[immessageModel.name] = immessageModel;
  db[recentSessionInfoModel.name] = recentSessionInfoModel;
  db[userinfoModel.name] = userinfoModel;

  Object.keys(db).forEach((modelName) => {
    console.log('modelName', db[modelName].associate);
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};


module.exports = getDb;
