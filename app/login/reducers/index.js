import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const immutableState = {
  login: {
    status: 'UNLOGIN',
    error: '',
    users: []
  }
};

const login = handleActions({
  TRY_LOGIN: { next: (state = immutableState) => Object.assign({}, state, {
    status: 'LOGINING'
  }) },
  LOGIN_FAIL: {
    next: (state = immutableState, action) => Object.assign({}, state, {
      status: 'UNLOGIN',
      error: action.payload
    }),
    throw: (state = immutableState, action) => Object.assign({}, state, {
      status: 'UNLOGIN',
      error: action.error.message
    })
  },
  LOGIN_HISTORY_LOAD_SUCCESS: {
    next: (state = immutableState, action) => Object.assign({}, state, {
      users: action.payload
    })
  }
}, immutableState);

export default combineReducers({ login });
