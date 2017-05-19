'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
      return queryInterface.createTable('fileTransferMsg', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    taskid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fromid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    filename: {
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
    },
    savepath: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    filesize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    finishtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  });
  
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:  */
      return queryInterface.dropTable('fileTransferMsg');
  }
};
