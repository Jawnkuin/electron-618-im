/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departmentinfo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deptId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    deptName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parentDeptId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deptStatus: {
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
