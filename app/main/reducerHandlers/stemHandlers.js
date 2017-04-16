import _ from 'lodash';
import { BrowserWindow } from 'electron';
import actionCreators from '../../main/actions';
import { stemKeys } from '../reducers/stem';
import mainStore from '../../main/store';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';
import { TALK_PATH } from '../../configs';

const Actions = actionCreators(mainStore);

// payload ：userId，latestUpdateTime
export default (preState, newState) => {
  console.log('stemhandlers called');

  const stateKeys = _.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // 初始化为空值
    if (!newState[key] || _.isEmpty(newState[key])) {
      return;
    }
    // 登录不需要变化，待改
    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        // toBuddys 为数组
        case stemKeys.toBuddys:
          {
            const newBuddys = _.differenceWith(newState[key], preState[key],
              (f, l) => _.isEqual(f.userId, l.userId));
            if (!newBuddys || newBuddys.length === 0) {
              break;
            }

            const talkWin = new BrowserWindow(WindowConfigs.talk);
            windowManager.add(talkWin, 'talk', () => {
              Actions.onLoadTalk(newBuddys[0]);
            });
            talkWin.loadURL(TALK_PATH);
          }

          break;
        default:


      }
    }
  });
};
