import _ from 'lodash';
import { BrowserWindow } from 'electron';
import actionCreators from '../../main/actions';
import mainStore from '../../main/store';
import { loginKeys } from '../reducers/login';
import { WindowConfigs, mainWindowManager } from '../../utils/WindowManager';
import { STEM_PATH } from '../../configs';
import { getUnreadMsgCnt } from '../../utils/apis/talk';

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
            // 登录成功打开主窗体，关闭登录窗体
            const stemWin = new BrowserWindow(WindowConfigs.stem);
            const loginWinId = getState().windows.login.windowID;

            mainWindowManager.add(stemWin, 'stem', () => {
              mainWindowManager.close(loginWinId);
              Actions.onLoadUser(newState[key]);
            });

            stemWin.loadURL(STEM_PATH);

            // 循环请求未读消息，后期放到独立模块
            setInterval(getUnreadMsgCnt, 10000);
          }

          break;
        default:


      }
    }
  });
};
