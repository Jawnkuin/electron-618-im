import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const immutableState = {
  login: {
    status: 'UNLOGIN',
    error: ''
  }
};

const login = handleActions({
  LOGIN: { next: (state = immutableState) => Object.assign({}, state, {
    status: 'LOGINING'
  }) },
  LOGIN_FAIL: {
    next: (state = immutableState, action) => Object.assign({}, state, {
      status: 'UNLOGIN',
      error: action.payload.errMsg
    })
  }
}, immutableState);

export default combineReducers({ login });
