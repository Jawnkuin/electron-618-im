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
            const talkList = _.unionBy(state.talk, [{ ...action.payload }], 'windowID');
            Object.assign({}, state, {
              talk: talkList
            });
            break;
          }
        default:
          return state;
      }
    }
  }
}, immutableState);

export default windows;
