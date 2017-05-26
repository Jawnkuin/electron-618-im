import _ from 'lodash';
import { BrowserWindow } from 'electron';
import getActionCreators from '../../main/actions';
import { stemKeys } from '../reducers/stem';
import mainStore from '../../main/store';
import { WindowConfigs, mainWindowManager } from '../../utils/WindowManager';
import { TALK_PATH } from '../../configs';


// payload ：userId，latestUpdateTime
export default (preState, newState) => {
  const stateKeys = _.keys(newState);
  const Actions = getActionCreators();
  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    const preEmptyFlag = !!(!preState || !preState[key] || _.isEmpty(preState[key]));
    const newEmptyFlag = !!((!preState || !newState[key] || _.isEmpty(newState[key])));
    // if the new one and the previous one are both empty, pass
    if (newEmptyFlag && preEmptyFlag) {
      return;
    }

    if (preEmptyFlag || !_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        // toBuddys 为数组
        case stemKeys.toBuddys:
          {
            // toBuddys 减少一位 differenceWith结果为空
            const newBuddys = _.differenceWith(newState[key], preState[key],
              (f, l) => _.isEqual(f.userId, l.userId));
            if (!newBuddys || newBuddys.length === 0) {
              break;
            }

            const talkWin = new BrowserWindow(WindowConfigs.talk);

            mainWindowManager.add(talkWin, 'talk', () => {
              const loadInfo = {
                buddyInfo: newBuddys[0],
                selfInfo: mainStore.getState().login.user
              };
              const unReadInfos = mainStore.getState().talk.unReadInfos;

              let msgList = null;

              if (unReadInfos && unReadInfos.length > 0) {
                const openIndex = _.findIndex(unReadInfos, (uInfo) => {
                  const uInfoUserId = uInfo.buddyinfo.userId;

                  return _.isEqual(uInfoUserId, newBuddys[0].userId);
                });
                // 打开的talk窗口对话者在unReadInfos里面
                if (openIndex >= 0) {
                  msgList = _.cloneDeep(unReadInfos[openIndex].unReadMsgInfo.msgs);
                }
              }
              // talk： 加载会话双方信息
              // stem:  消除提示
              // main:  更改main state
              Actions.onLoadTalk(loadInfo);

              if (msgList && msgList.length > 0) {
                Actions.checkUnreadMessage(msgList);
              }
            });
            talkWin.loadURL(TALK_PATH);
          }

          break;
        default:
          console.warn(`unhandled key ${key} in stem handlers`);
      }
    }
  });
};
