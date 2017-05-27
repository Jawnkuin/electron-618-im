/* jshint indent: 2 */
/* eslint-disable */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('immessage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    msgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sessionid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    talkerid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rendertype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '2'
    },
    sessiontype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    msgtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    createtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'immessage'
  });
};
