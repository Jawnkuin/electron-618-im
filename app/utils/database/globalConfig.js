const getGlobalConfig = require('../../configs').getGlobalConfig;
const low = require('lowdb');
const _ = require('lodash');
// models.recentSessionInfo.findAll().then(function(recentSessionInfos) {
// console.log(recentSessionInfos);
//  });
// 初始化所有models表


let globalConfigDb = null;

function getGlobalConfigDb () {
  if (!globalConfigDb) {
    const initObj = {
      users: []
    };
    globalConfigDb = low(getGlobalConfig());
    globalConfigDb.defaults(initObj).write();
  }

  return {
    // 获取所有用户
    getAllUsers: () => globalConfigDb.get('users').value(),

    setUserRememberPsw: name => globalConfigDb.get('users')
      .find({ name })
      .assign({ remember: true })
      .write(),

    setUserAutoLogin: name => globalConfigDb.get('users')
      .find({ name })
      .assign({ autoLogin: true, remember: true })
      .write(),

    removeUserByName: name => globalConfigDb.get('users').remove({ name }).write(),

    addOrUpdateUser: async (user) => {
      const newUser = _.cloneDeep(user);
      if (!newUser.name) {
        newUser.name = newUser.userRealName;
      }
      if (!newUser.name && !newUser.userRealName) {
        throw new Error('unsetted user name or avart');
      }
      newUser.logging = true;
      await globalConfigDb.get('users').remove({ name: newUser.name }).write();
      await globalConfigDb.get('users').push(newUser).write();
    },

    setLogoutByName: (name) => {
      console.log('setLogoutByName': name);

      return globalConfigDb.get('users')
          .find({ name })
          .assign({ logging: false })
          .write();
    }

  };
}

module.exports = getGlobalConfigDb;
