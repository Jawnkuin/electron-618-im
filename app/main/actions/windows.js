import { createAction } from 'redux-actions';
import { BrowserWindow } from 'electron';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';
import { LOGIN_PATH, STEM_PATH, TALK_PATH } from '../../configs';

const ADD_LOGIN_WINDOW = 'ADD_LOGIN_WINDOW';
const ADD_STEM_WINDOW = 'ADD_STEM_WINDOW';
const ADD_TALK_WINDOW = 'ADD_TALK_WINDOW';

const addLoginWindowActionCreator = createAction(ADD_LOGIN_WINDOW, windowID => windowID);
const addStemWindowActionCreator = createAction(ADD_STEM_WINDOW, windowID => windowID);
const addTalkWindowActionCreator = createAction(ADD_TALK_WINDOW, windowID => windowID);

// 窗口打开事件，更新state
export const addLoginWindow = () => (dispatch) => {
  const loginWindow = new BrowserWindow(WindowConfigs.login);
  const loginWinId = windowManager.add(loginWindow, 'login');
  dispatch(addLoginWindowActionCreator(loginWinId));
  loginWindow.loadURL(LOGIN_PATH);
};

export const addStemWindow = () => (dispatch) => {
  const stemWindow = new BrowserWindow(WindowConfigs.stem);
  const stemWinId = windowManager.add(stemWindow, 'stem');
  dispatch(addStemWindowActionCreator(stemWinId));
  stemWindow.loadURL(STEM_PATH);
};

export const addTalkWindow = () => (dispatch) => {
  const talkWindow = new BrowserWindow(WindowConfigs.talk);
  const talkWinId = windowManager.add(talkWindow, 'stem');
  dispatch(addTalkWindowActionCreator(talkWinId));
  talkWindow.loadURL(TALK_PATH);
};
