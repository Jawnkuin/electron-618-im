import { handleActions } from 'redux-actions';
import _ from 'lodash';

const immutableState = {
  login: {
  },
  stem: {
  },
  talk: []
};

const windows = handleActions({
  ADD_WINDOW: {
    next: (state = immutableState, action) => {
      switch (action.payload.typeName) {
        case 'login':
          {
            return Object.assign({}, state, {
              login: {
                ...action.payload
              }
            });
          }
        case 'stem':
          {
            return Object.assign({}, state, {
              stem: {
                ...action.payload
              }
            });
          }
        case 'talk':
          {
            console.log('action.payload', action.payload);
            const talkList = _.unionBy(state.talk, [{ ...action.payload }], 'windowID');
            return Object.assign({}, state, {
              talk: talkList
            });
          }
        default:
          return state;
      }
    }
  },
  CLOSE_WINDOW: {
    next: (state = immutableState, action) => {
      switch (action.payload.typeName) {
        case 'login':
          {
            return Object.assign({}, state, {
              login: {
              }
            });
          }
        case 'stem':
          {
            return Object.assign({}, state, {
              stem: {
              }
            });
          }
        // talk window可以有多个
        case 'talk':
          {
            const talkList = _.pullAllBy(state.talk, [{ ...action.payload }], 'windowID');
            return Object.assign({}, state, {
              talk: talkList
            });
          }
        default:
          return state;
      }
    }
  }
}, immutableState);

export const windowsKeys = {
  login: 'login',
  stem: 'stem',
  talk: 'talk'
};

export default windows;
