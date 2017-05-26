import { createAction } from 'redux-actions';
// import doLogin from '../../utils/apis/login';

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// SUCCESSFULLY GET LOGIN HISTORY FROM LOCAL DATA
export const LOGIN_HISTORY_LOAD_SUCCESS = 'LOGIN_HISTORY_LOAD_SUCCESS';

// FIRED ON CLICK BUTTON CALLED
export const TRY_LOGIN = 'TRY_LOGIN';

// 向着主线程发送尝试登录
export const tryLoginAction = createAction(TRY_LOGIN,
  loginUser => loginUser
);
