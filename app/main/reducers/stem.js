import { handleActions } from 'redux-actions';
import _ from 'lodash';


// 从stem窗口打开的对话框
const immutableState = {
  toBuddys: []
};

const stem = handleActions({
  OPEN_SINGLE_TALK: {
    next: (state = immutableState, action) => {
      const toBuddy = action.payload.toBuddy;
      console.log(toBuddy);
      return Object.assign({}, state, {
        toBuddys: _.unionWith(state.toBuddys, [toBuddy], (f, l) => _.isEqual(f.userId, l.userId))
      });
    }
  },
  CLOSE_SINGLE_TALK: {
    next: (state = immutableState, action) => {
      const toBuddy = action.payload.toBuddy;
      const toBuddys = _.pullAllWith(state.toBuddys, [toBuddy], (f, l) => _.isEqual(f.userId, l.userId));
      return Object.assign({}, state, {
        toBuddys
      });
    }
  }
}, immutableState);

export const stemKeys = {
  toBuddys: 'toBuddys'
};


export default stem;
