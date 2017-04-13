import { loginFailActionCreator, loginSuccessActionCreator } from './login';
import { addWindowActionCreator } from './windows';
import {
  onLoadUserActionCreator,
  getAllUserFailActionCreator,
  getAllUserSuccessActionCreator,
  getDepFailActionCreator,
  getDepSuccessActionCreator
} from './stem';

export default store => ({
  loginFail: loginFailActionCreator(store.dispatch, store.getState),
  loginSuccess: loginSuccessActionCreator(store.dispatch, store.getState),

  addWindow: addWindowActionCreator(store.dispatch, store.getState),

  onLoadUser: onLoadUserActionCreator(store.dispatch, store.getState),
  getAllUserFail: getAllUserFailActionCreator(store.dispatch, store.getState),
  getAllUserSuccess: getAllUserSuccessActionCreator(store.dispatch, store.getState),
  getDepFail: getDepFailActionCreator(store.dispatch, store.getState),
  getDepSuccess: getDepSuccessActionCreator(store.dispatch, store.getState)

});
