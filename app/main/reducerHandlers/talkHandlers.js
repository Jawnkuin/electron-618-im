import _ from 'lodash';
import { createSelectorMapper } from 'reactive-redux-state';
import trayManager from '../../utils/Tray';
import getActionCreators from '../../main/actions';
import mainStore from '../../main/store';


// 未读信息
const unReadInfosSelector = (state) => {
  let returnValue = [];
  try {
    returnValue = state.talk.unReadInfos;
  } catch (e) {
    returnValue = [];
  }
  return returnValue;
};
// eslint-disable-next-line import/prefer-default-export
export const unReadInfosMapper = createSelectorMapper(unReadInfosSelector, (preState, newState) => {
  const unReadInfos = newState;
  if (!unReadInfos || unReadInfos.length === 0) {
    if (trayManager.tray) {
      trayManager.stopFlash();
    }
  } else {
    const Actions = getActionCreators();
    const { userList } = mainStore.getState().stem;

    // 设置托盘点击打开对应会话窗体
    const lastOne = unReadInfos[unReadInfos.length - 1];
    const userItemIndex = _.findIndex(userList, (u) => {
      let plainUserId;
      // the id from pb may not a plain Object
      // use Object.assign() to change it to a plain object without former __proto__
      if (typeof u.userId === 'object') {
        plainUserId = Object.assign({}, u.userId);
      } else {
        plainUserId = u.userId;
      }
      return _.isEqual(plainUserId, lastOne.buddyinfo.userId);
    });
    if (userItemIndex >= 0) {
      const userItem = userList[userItemIndex];
      const copyItem = Object.assign({}, userItem, { userId: userItem.userId });
      trayManager.flashTray();
      trayManager.setClickInstantHandler(() => { Actions.openSingleTalk(copyItem); });
    }
  }
});
