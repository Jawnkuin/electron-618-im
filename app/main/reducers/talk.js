import { handleActions } from 'redux-actions';
import _ from 'lodash';


// 从stem窗口打开的对话框
const immutableState = {
  unReadInfos: []
};

const talk = handleActions({
  RECIEVE_UNREAD_MESSAGE: {
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

export const talkKeys = {
  unReadInfos: 'unReadInfos'
};


export default talk;
