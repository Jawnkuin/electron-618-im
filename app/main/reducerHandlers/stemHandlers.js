import _ from 'lodash';
import actionsCreators from '../../main/actions';
import mainStore from '../../main/store';
import { stemKeys } from '../reducers/stem';
// handlers用来执行state变化后需要执行的事务
const Actions = actionsCreators(mainStore);
// payload ：userId，latestUpdateTime
export default (preState, newState) => {
  const stateKeys = _.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // 初始化为空值
    if (!newState[key] || _.isEmpty(newState[key])) {
      return;
    }
    // 登录不需要变化，待改
    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      console.log('default', key);
      switch (key) {
        case stemKeys.getAllUsers:
          getAllUser(newState[key].userId, newState[key].latestUpdateTime);
          break;
        case stemKeys.getDepList:
          getDepList(newState[key].userId, newState[key].latestUpdateTime);
          break;
        default:
      }
    }
  });
};
