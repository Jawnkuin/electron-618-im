import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { windowManager, WindowConfigs } from '../../utils/WindowManager';

const immutableState = {
  login: {
    data: {},
    window: {}
  },
  stem: {
    data: {},
    window: {}
  },
  talk: []
};

const login = handleActions({
  LOGIN: { next: async (state = immutableState, action) => Object.assign({}, state, {
    user: action.payload
  }) }
}, immutableState);

const windows = handleActions({
  ADD_LOGIN_WINDOW: { next: async (state = immutableState, action) => Object.assign({}, state, {
    window: Object.assign({}, state.window, {
      windowID: action.payload,
      windowState: 1
    })
  }) }
}, immutableState);

export default combineReducers({ login, windows });
