import _ from 'lodash';
import { BrowserWindow } from 'electron';
import { createSelectorMapper } from 'reactive-redux-state';
import getActionCreators from '../../main/actions';
import mainStore from '../../main/store';
import { WindowConfigs, mainWindowManager } from '../../utils/WindowManager';
import { TALK_PATH } from '../../configs';

// 当前打开的对话
const toBuddysSelector = (state) => {
  let returnValue = [];
  try {
    returnValue = state.stem.toBuddys;
  } catch (e) {
    returnValue = [];
  }
  return returnValue;
};

// eslint-disable-next-line import/prefer-default-export
export const toBuddysMapper = createSelectorMapper(toBuddysSelector, (preState, newState) => {
  const Actions = getActionCreators();
  // toBuddys 减少一位 differenceWith结果为空
  const newBuddys = _.differenceWith(newState, preState,
    (f, l) => _.isEqual(f.userId, l.userId));
  if (!newBuddys || newBuddys.length === 0) {
    return;
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
});

