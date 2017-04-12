import { loginFailActionCreator, loginSuccessActionCreator } from './login';
import { addWindowActionCreator } from './windows';
import { getAllUserMain, getDepListMain } from './buddy';

export default store => ({
  loginFail: loginFailActionCreator(store.dispatch, store.getState),
  loginSuccess: loginSuccessActionCreator(store.dispatch, store.getState),
  addWindow: addWindowActionCreator(store.dispatch, store.getState),
  getDepListMain: getDepListMain(store.dispatch, store.getState)
});
