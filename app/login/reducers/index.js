import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const immutableState = {
  stem: {
    user: {}
  },
  talk: []
};

const login = handleActions({
  LOGIN: { next: (state = immutableState, action) => Object.assign({}, state, { stem: {
    user: action.payload
  } }) }
}, immutableState);

export default combineReducers({ login });
