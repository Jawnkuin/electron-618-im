import { createAction } from 'redux-actions';
// import { windowManager } from '../../utils/WindowManager';
import doLogin from '../../utils/apis/login';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../login/actions';
// import doLogin from '../../utils/apis/login';

export const LOGIN_SERVER = 'LOGIN_SERVER';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

const loginFailActionCreator = createAction(LOGIN_FAIL, errMsg => ({ errMsg }));

const loginSuccessActionCreator = createAction(LOGIN_SUCCESS, res => res);

// 主线程调用TCPClient登录
export const doLoginServer = async (name, psw) => {
  try {
    return await doLogin(name, psw);
  } catch (e) {
    return loginFailActionCreator(e.message);
  }
};
