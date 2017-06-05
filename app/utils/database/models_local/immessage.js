// const Long = require('long');


module.exports = function (sequelize, DataTypes) {
  return sequelize.define('immessage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    msgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toSessionId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fromUserId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    msgData: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    msgType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    sessionType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    createTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    readAck: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reserve1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reserve2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reserve3: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'immessage'
  });
};
