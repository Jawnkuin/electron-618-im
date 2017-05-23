const getGlobalConfig = require('../../configs').getGlobalConfig;
const low = require('lowdb');
// models.recentSessionInfo.findAll().then(function(recentSessionInfos) {
// console.log(recentSessionInfos);
//  });
// 初始化所有models表


let globalConfigDb = null;

function getGlobalConfigDb () {
  if (!globalConfigDb) {
    const initObj = {
      defaultId: '',
      users: []
    };
    globalConfigDb = low(getGlobalConfig());
    globalConfigDb.defaults(initObj).write();
  }

  return {
    getDepartmentLastUpdateTime: () => globalConfigDb.get('department.lastUpdateTime').value(),
    setDepartmentLastUpdateTime: t => globalConfigDb.set('department.lastUpdateTime', t).write(),

    getUserLastUpdateTime: () => globalConfigDb.get('user.lastUpdateTime').value(),
    setUserLastUpdateTime: t => globalConfigDb.set('user.lastUpdateTime', t).write(),

    getRecentSessionLastUpdateTime: () => globalConfigDb.get('recentSession.lastUpdateTime').value(),
    setRecentSessionLastUpdateTime: t => globalConfigDb.set('recentSession.lastUpdateTime', t).write()
  };
}

module.exports = getGlobalConfigDb;
