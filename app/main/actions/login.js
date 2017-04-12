import { createAction } from 'redux-actions';
import { BrowserWindow } from 'electron';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';

import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../login/actions';
import { STEM_PATH } from '../../configs';

export const LOGIN_SERVER = 'LOGIN_SERVER';


/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/


export const loginFailActionCreator =
 dispatch => (...args) => dispatch(createAction(LOGIN_FAIL, errMsg => ({ errMsg }))(...args));

export const loginSuccessActionCreator =
 (dispatch, getState) => (...args) => {
   const stemWin = new BrowserWindow(WindowConfigs.stem);
   const loginWinId = getState().windows.login.windowID;
   windowManager.add(stemWin, 'stem', () => {
     windowManager.close(loginWinId);
     dispatch(createAction(LOGIN_SUCCESS, res => res)(...args));
   });
   stemWin.loadURL(STEM_PATH);
 };
