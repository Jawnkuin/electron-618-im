import _ from 'lodash';
// import { getGlobalConfigDb } from '../../utils/database';
import { windowsKeys } from '../reducers/windows';

export default (preState, newState) => {
  console.log('windowsHandlerCalled');
  const stateKeys = Object.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    const preEmptyFlag = !!(!preState || !preState[key] || _.isEmpty(preState[key]));
    const newEmptyFlag = !!((!preState || !newState[key] || _.isEmpty(newState[key])));
    // if the new one and the previous one are both empty, pass
    if (newEmptyFlag && preEmptyFlag) {
      return;
    }

    if (preEmptyFlag || !_.isEqualWith(preState[key], newState[key])) {
      // const globalConfigDb = getGlobalConfigDb();
      switch (key) {
        case windowsKeys.login: {
          // 仅仅在登录时候响应
          /*
          if (!newEmptyFlag) {
            const allUsers = globalConfigDb.getAllUsers();
            if (allUsers.length > 0) {
              console.log(allUsers);
            }
          }
          */

          break;
        }
        case windowsKeys.stem: {
          break;
        }
        case windowsKeys.talk: {
          break;
        }
        default:
          break;
      }
    }
  });
};
