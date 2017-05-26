import { createAction } from 'redux-actions';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_HISTORY_LOAD_SUCCESS } from '../../login/actions';


export const loginFailActionCreator =
 dispatch => (...args) => {
   // 登录失败
   dispatch(createAction(LOGIN_FAIL, errMsg => errMsg,
     () => ({ scope: 'login' }))(...args));
 };


export const loginSuccessActionCreator =
 dispatch => (...args) => {
   // 登录成功
   dispatch(createAction(LOGIN_SUCCESS, res => res)(...args));
 };


// 获取登录历史
export const loginHistoryLoadSuccessActionCreator =
 dispatch => (...args) => {
   dispatch(createAction(
     LOGIN_HISTORY_LOAD_SUCCESS,
     res => res,
     () => ({ scope: 'login' }))(...args));
 };
