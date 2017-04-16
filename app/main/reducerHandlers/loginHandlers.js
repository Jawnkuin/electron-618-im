import _ from 'lodash';
import { BrowserWindow } from 'electron';
import actionCreators from '../../main/actions';
import mainStore from '../../main/store';
import { loginKeys } from '../reducers/login';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';
import { STEM_PATH } from '../../configs';

const Actions = actionCreators(mainStore);

// payload ：userId，latestUpdateTime
export default (preState, newState, dispatch, getState) => {
  console.log('loginhandlers called');

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
        case loginKeys.user:
          {
            const stemWin = new BrowserWindow(WindowConfigs.stem);
            const loginWinId = getState().windows.login.windowID;
            windowManager.add(stemWin, 'stem', () => {
              windowManager.close(loginWinId);
              Actions.onLoadUser(newState[key]);
            });
            stemWin.loadURL(STEM_PATH);
          }

          break;
        default:


      }
    }
  });
};
