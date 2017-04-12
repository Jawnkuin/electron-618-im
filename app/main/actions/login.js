import { createAction } from 'redux-actions';
import { BrowserWindow } from 'electron';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';
import doLogin from '../../utils/apis/login';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../login/actions';
import { STEM_PATH, TALK_PATH } from '../../configs';

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
export const doLoginServer = dispatch => async (name, psw) => {
  try {
    const res = await doLogin(name, psw);
    const stemWin = new BrowserWindow(WindowConfigs.stem);
    windowManager.add(stemWin, 'stem', () => dispatch(loginSuccessActionCreator(res)));
    stemWin.loadURL(STEM_PATH);
  } catch (e) {
    console.log(e);
    dispatch(loginFailActionCreator(e.message));
  }
};
