/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userRealName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userNickName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    departmentId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    departmentName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userGender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1'
    },
    userDomain: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userTel: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    signInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reserve1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reserve2: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'userinfo'
  });
};
