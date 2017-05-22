import _ from 'lodash';
import { BrowserWindow } from 'electron';
import Long from 'long';
import actionCreators from '../../main/actions';
import mainStore from '../../main/store';
import { loginKeys } from '../reducers/login';
import { WindowConfigs, mainWindowManager } from '../../utils/WindowManager';
import { STEM_PATH, setLocalDataPath } from '../../configs';
import { startHeartBeatLooper } from '../../utils/apis/main';
import { getUnreadMsgCnt } from '../../utils/apis/talk';
import { getDepList, getAllUser } from '../../utils/apis/stem';

const Actions = actionCreators(mainStore);

// payload ：userId，latestUpdateTime
export default (preState, newState, dispatch, getState) => {
  console.log('loginhandlers called');

  const stateKeys = _.keys(newState);

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, async (key) => {
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
            // 设置用户数据库
            const userId = newState[key].userInfo.userId;
            setLocalDataPath(Long.fromValue(userId).toString());


            // 打开主窗体，关闭登录窗体
            const stemWin = new BrowserWindow(WindowConfigs.stem);
            const loginWinId = getState().windows.login.windowID;

            mainWindowManager.add(stemWin, 'stem', () => {
              mainWindowManager.close(loginWinId);
              Actions.onLoadUser(newState[key]);

              getDepList(userId, 0);
              getAllUser(userId, 0);
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
