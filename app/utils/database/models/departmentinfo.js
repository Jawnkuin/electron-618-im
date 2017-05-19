/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departmentinfo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    dId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parentDepartId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
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
    tableName: 'departmentinfo'
  });
};
