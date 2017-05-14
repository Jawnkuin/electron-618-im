import _ from 'lodash';
import { talkKeys } from '../reducers/talk';
import trayManager from '../../utils/Tray';
import actionCreators from '../../main/actions';
import mainStore from '../../main/store';

const Actions = actionCreators(mainStore);


// payload ：userId，latestUpdateTime
export default (preState, newState, dispatch, getState) => {
  console.log('talkhandlers called');

  const stateKeys = _.keys(newState);
  _.forEach(stateKeys, (key) => {
    // if the new one and the previous one are both empty, pass
    if (
      (!newState[key] || _.isEmpty(newState[key]))
      &&
      (!preState || !preState[key] || _.isEmpty(preState[key]))
    ) {
      return;
    }

    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      switch (key) {
        case talkKeys.unReadInfos:
          {
            const unReadInfos = newState[key];
            if (!unReadInfos || unReadInfos.length === 0) {
              if (trayManager.tray) {
                trayManager.stopFlash();
              }
            } else {
              const { userList } = getState().stem;
              trayManager.flashTray();
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

                trayManager.setClickHandler(() => Actions.openSingleTalk(copyItem));
              }
            }
          }

          break;
        default:


      }
    }
  });
};
