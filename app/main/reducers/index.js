import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { BrowserWindow } from 'electron';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';
import { STEM_PATH, TALK_PATH } from '../../configs';
import mainStore from '../store';
import { doLoginServer } from '../actions/login';

const immutableState = {
  login: {},
  stem: {
    user: {}
  },
  talk: []
};

const login = handleActions({
  LOGIN: { next: async (state = immutableState, action) => {
    await doLoginServer(action.payload.name, action.payload.psw)(mainStore.dispatch);
    const stemWindow = new BrowserWindow(WindowConfigs.stem);
    windowManager.add(stemWindow, 'stem');
    stemWindow.loadURL(STEM_PATH);
    return Object.assign({}, state, {
      stem: {
        user: action.payload
      }
    });
  } },
  TALK: {
    next: (state = immutableState, action) => {
      console.log(action);
      console.log(process.cwd());
      const stemWindow = new BrowserWindow(WindowConfigs.talk);
      windowManager.add(stemWindow, 'talk');
      stemWindow.loadURL(TALK_PATH);
      return Object.assign({}, state, {
        stem: {
          user: action.payload
        }
      });
    }
  }
}, immutableState);

export default combineReducers({ login });
