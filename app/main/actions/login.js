import { createAction } from 'redux-actions';
// import { windowManager } from '../../utils/WindowManager';
import doLogin from '../../utils/apis/login';
import { LOGIN_FAIL } from '../../login/actions';
// import doLogin from '../../utils/apis/login';

export const LOGIN_SERVER = 'LOGIN_SERVER';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

const loginFailActionCreator = createAction(LOGIN_FAIL, errMsg => ({ errMsg }));

// 主线程调用TCPClient登录
export const doLoginServer = (name, psw) => (dispatch) => {
  doLogin(name, psw).then(
    res => dispatch(loginFailActionCreator(res)),
    err => dispatch(loginFailActionCreator(err.message))
  );
};
