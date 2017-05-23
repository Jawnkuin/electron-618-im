import _ from 'lodash';
import { windowsKeys } from '../reducers/windows';

// payload ：用户名，密码
export default (preState, newState) => {
  console.log('windowsHandlerCalled');
  const stateKeys = Object.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // 初始化为空值
    if (!newState[key] || _.isEmpty(newState[key])) {
      return;
    }
    // 登录不需要变化，待改
    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        case windowsKeys.login: {
          break;
        }
      }
    }
  });
};
