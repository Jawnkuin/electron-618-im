const getLocalAccountConfig = require('../../configs').getLocalAccountConfig;
const low = require('lowdb');
// models.recentSessionInfo.findAll().then(function(recentSessionInfos) {
// console.log(recentSessionInfos);
//  });
// 初始化所有models表


let accountConfigDb = null;

function getAccountConfigDb () {
  if (!accountConfigDb) {
    const initObj = {
      department: {
        lastUpdateTime: 0
      },
      user: {
        lastUpdateTime: 0
      },
      recentSession: {
        lastUpdateTime: 0
      }
    };
    accountConfigDb = low(getLocalAccountConfig());
    accountConfigDb.defaults(initObj).write();
  }

  return {
    getDepartmentLastUpdateTime: () => accountConfigDb.get('department.lastUpdateTime').value(),
    setDepartmentLastUpdateTime: t => accountConfigDb.set('department.lastUpdateTime', t).write(),

    getUserLastUpdateTime: () => accountConfigDb.get('user.lastUpdateTime').value(),
    setUserLastUpdateTime: t => accountConfigDb.set('user.lastUpdateTime', t).write(),

    getRecentSessionLastUpdateTime: () => accountConfigDb.get('recentSession.lastUpdateTime').value(),
    setRecentSessionLastUpdateTime: t => accountConfigDb.set('recentSession.lastUpdateTime', t).write()
  };
}

module.exports = getAccountConfigDb;
