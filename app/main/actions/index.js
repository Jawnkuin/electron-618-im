import { loginFailActionCreator, loginSuccessActionCreator } from './login';
import {
  addWindowActionCreator,
  closeWindowActionCreator
} from './windows';
import {
  onLoadUserActionCreator,
  getAllUserFailActionCreator,
  getAllUserSuccessActionCreator,
  getDepFailActionCreator,
  getDepSuccessActionCreator
} from './stem';
import {
  onLoadTalkActionCreator
} from './talk';

export default store => ({
  loginFail: loginFailActionCreator(store.dispatch, store.getState),
  loginSuccess: loginSuccessActionCreator(store.dispatch, store.getState),

  addWindow: addWindowActionCreator(store.dispatch, store.getState),
  closeWindow: closeWindowActionCreator(store.dispatch, store.getState),

  onLoadUser: onLoadUserActionCreator(store.dispatch, store.getState),
  getAllUserFail: getAllUserFailActionCreator(store.dispatch, store.getState),
  getAllUserSuccess: getAllUserSuccessActionCreator(store.dispatch, store.getState),
  getDepFail: getDepFailActionCreator(store.dispatch, store.getState),
  getDepSuccess: getDepSuccessActionCreator(store.dispatch, store.getState),

  onLoadTalk: onLoadTalkActionCreator(store.dispatch, store.getState)

});
