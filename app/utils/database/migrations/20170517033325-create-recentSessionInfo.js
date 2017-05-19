'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
      return queryInterface.createTable('recentSessionInfo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.TEXT,
      allowNull: false
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
  });
    
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('recentSessionInfo');    
  }
};
