/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recentSessionInfo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sessionId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    sessionType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    updatedTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    lastMsgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    lastMsgData: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latestMsgFromId: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'recentSessionInfo'
  });
};
