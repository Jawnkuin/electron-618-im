import { createAction } from 'redux-actions';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../login/actions';


export const loginFailActionCreator =
 dispatch => (...args) => {
   console.log('loginFailActionCreator', args);
   // 登录失败
   dispatch(createAction(LOGIN_FAIL, errMsg => errMsg,
     () => ({ scope: 'local' }))(...args));
 };


export const loginSuccessActionCreator =
 dispatch => (...args) => {
   // 登录成功
   dispatch(createAction(LOGIN_SUCCESS, res => res)(...args));
 };
