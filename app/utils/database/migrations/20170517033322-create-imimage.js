'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
      return queryInterface.createTable('imimage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    hashcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    localPath: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    urlPath: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.dropTable('imimage');
   
  }
};
