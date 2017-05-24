import _ from 'lodash';
import { BrowserWindow } from 'electron';
import Long from 'long';
import path from 'path';
import trayManager from '../../utils/Tray';
import getActionCreators from '../../main/actions';
import mainStore from '../../main/store';
import { loginKeys } from '../reducers/login';
import { WindowConfigs, mainWindowManager } from '../../utils/WindowManager';
import { ICON_PATH, STEM_PATH, setLocalDataPath } from '../../configs';
import { startHeartBeatLooper } from '../../utils/apis/main';
import { getUnreadMsgCnt } from '../../utils/apis/talk';
import { getDepList, getAllUser } from '../../utils/apis/stem';


// payload ：userId，latestUpdateTime
export default (preState, newState) => {
  console.log('loginhandlers called');
  const Actions = getActionCreators();
  const stateKeys = _.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // 初始化为空值
    if (!newState[key] || _.isEmpty(newState[key])) {
      return;
    }
    // 发生了变化
    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        case loginKeys.user:
          {
            // 登录成功
            // 初始化托盘
            trayManager.setDefaultTrayIcon(path.join(ICON_PATH, 'tray.png'));

            // 设置用户数据库
            const userId = newState[key].userInfo.userId;
            setLocalDataPath(Long.fromValue(userId).toString());


            // 打开主窗体，关闭登录窗体
            const stemWin = new BrowserWindow(WindowConfigs.stem);
            const loginWinId = mainStore.getState().windows.login.windowID;

            mainWindowManager.add(stemWin, 'stem', () => {
              mainWindowManager.close(loginWinId);

              // 默认托盘点击事件为主窗体显示
              trayManager.setClickDefaultHandler(() => {
                if (stemWin.isMinimized()) {
                  stemWin.restore();
                }
                if (!stemWin.isFocused()) {
                  stemWin.focus();
                }
              });

              Actions.onLoadUser(newState[key]);
              // 请求部门列表
              getDepList(userId);
              // 请求所有用户
              getAllUser(userId);
              // 请求未读消息数量
              getUnreadMsgCnt();
            });

            stemWin.loadURL(STEM_PATH);

            // 发送心跳循环
            startHeartBeatLooper();
          }

          break;
        default:
      }
    }
  });
};
