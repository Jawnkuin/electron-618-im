import _ from 'lodash';
import { windowsKeys } from '../reducers/windows';

export default (preState, newState) => {
  console.log('windowsHandlerCalled');
  const stateKeys = Object.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // if the new one and the previous one are both empty, pass
    if (
      (!newState[key] || _.isEmpty(newState[key]))
      &&
      (!preState[key] || _.isEmpty(preState[key]))
    ) {
      return;
    }

    if (!_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        case windowsKeys.login: {
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
