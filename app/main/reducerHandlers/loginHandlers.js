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
import { doLogin } from '../../utils/apis/login';
import { getGlobalConfigDb } from '../../utils/database';


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
      const globalConfigDb = getGlobalConfigDb();
      switch (key) {
        case loginKeys.user:
          {
            try {
              const reserveUserData = mainStore.getState().login.reserveUserData;
              globalConfigDb.addOrUpdateUser(Object.assign({}, reserveUserData, { logging: true }));
            } catch (e) {
              console.warn('Insert User Data Failed to "globalConfigDb"', e.message);
            }

            // 设置用户数据库
            const userId = newState[key].userId;
            setLocalDataPath(Long.fromValue(userId).toString());

            // 登录成功
            // 初始化托盘
            const curUser = newState[key];
            trayManager.setDefaultTrayIcon(path.join(ICON_PATH, 'tray.png'));
            trayManager.setToolTip(
              `${curUser.userNickName}\n${curUser.userRealName}`
            );


            // 打开主窗体，关闭登录窗体
            const stemWin = new BrowserWindow(WindowConfigs.stem);
            const loginWinId = mainStore.getState().windows.login.windowID;
            // stemWin.webContents.openDevTools();
            mainWindowManager.add(stemWin, 'stem', () => {
              mainWindowManager.close(loginWinId);
              // 默认托盘点击事件为主窗体显示
              trayManager.setClickDefaultHandler(() => {
                const theStem = mainWindowManager.getAll('stem')[0];
                if (!theStem) {
                  return;
                }
                // theStem.webContents.openDevTools();
                if (theStem.isMinimized()) {
                  theStem.restore();
                }
                if (!theStem.isFocused()) {
                  theStem.focus();
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
        case loginKeys.attempt:
          {
            // 尝试登录
            const newAttemptor = newState[key];
            const record = globalConfigDb.getUserByName(newAttemptor.name);
            if (record && record.logging) {
              // 异步
              setImmediate(() => {
                Actions.loginFail(`帐号[${newAttemptor.name}]不能重复登录！`);
              });
            } else {
              doLogin(newAttemptor.name, newAttemptor.psw);
            }

            break;
          }
        default:
      }
    }
  });
};
