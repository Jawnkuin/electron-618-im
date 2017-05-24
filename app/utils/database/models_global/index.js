// disable-eslint
/* eslint-disable */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const imimage = require('./imimage');
const getConfig = require('../../../configs').getGlobalDbConfig;

const db = {};
const env = process.env.NODE_ENV || 'development';



const getDb = () =>{
  const config = getConfig()[env];
  if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  const imimageModel = imimage(sequelize, Sequelize);
  db[imimageModel.name] = imimageModel;

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}


module.exports = getDb;
