/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imimage', {
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
  }, {
    tableName: 'imimage'
  });
};
