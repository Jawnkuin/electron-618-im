import { handleActions } from 'redux-actions';
import _ from 'lodash';


// 从stem窗口打开的对话框
const immutableState = {
  toBuddys: []
};

const stem = handleActions({
  OPEN_SINGLE_TALK: {
    // 将打开的会话添加到会话里面里面
    next: (state = immutableState, action) => {
      const toBuddy = action.payload.toBuddy;
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
