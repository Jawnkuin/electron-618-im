import {
  loginFailActionCreator,
  loginSuccessActionCreator,
  loginHistoryLoadSuccessActionCreator
} from './login';
import {
  addWindowActionCreator,
  closeWindowActionCreator
} from './windows';
import {
  onLoadUserActionCreator,
  getAllUserFailActionCreator,
  getAllUserSuccessActionCreator,
  getDepFailActionCreator,
  getDepSuccessActionCreator,
  openSingleTalkActionCreator,
  getUsersStatSuccessActionCreator
} from './stem';
import {
  onLoadTalkActionCreator,
  onReceiveMessageActionCreator,
  checkUnreadMessageActionCreator,
  onReceiveUnReadMsgListActionCreator,
  onGetHistoryMsgsActionCreator
} from './talk';

let actions = null;

export const wrapActions = (store) => {
  if (!actions) {
    actions = {
      loginFail: loginFailActionCreator(store.dispatch, store.getState),
      loginSuccess: loginSuccessActionCreator(store.dispatch, store.getState),
      loginHistoryLoadSuccess: loginHistoryLoadSuccessActionCreator(store.dispatch, store.getState),

      addWindow: addWindowActionCreator(store.dispatch, store.getState),
      closeWindow: closeWindowActionCreator(store.dispatch, store.getState),

      onLoadUser: onLoadUserActionCreator(store.dispatch, store.getState),
      getAllUserFail: getAllUserFailActionCreator(store.dispatch, store.getState),
      getAllUserSuccess: getAllUserSuccessActionCreator(store.dispatch, store.getState),
      getDepFail: getDepFailActionCreator(store.dispatch, store.getState),
      getDepSuccess: getDepSuccessActionCreator(store.dispatch, store.getState),
      openSingleTalk: openSingleTalkActionCreator(store.dispatch, store.getState),
      getUserStatSuccess: getUsersStatSuccessActionCreator(store.dispatch, store.getState),

      onLoadTalk: onLoadTalkActionCreator(store.dispatch, store.getState),
      onReceiveMessage: onReceiveMessageActionCreator(store.dispatch, store.getState),
      checkUnreadMessage: checkUnreadMessageActionCreator(store.dispatch, store.getState),
      onReceiveUnReadMsgList: onReceiveUnReadMsgListActionCreator(store.dispatch, store.getState),
      onGetHistoryMsgs: onGetHistoryMsgsActionCreator(store.dispatch, store.getState)

    };
  }
};

export default () => {
  if (!actions) {
    throw new Error('Error on try use wrapped actions before wrapping');
  }
  return actions;
};
