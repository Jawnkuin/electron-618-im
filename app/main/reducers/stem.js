import { handleActions } from 'redux-actions';
import _ from 'lodash';


// 从stem窗口打开的对话框
const immutableState = {
  toBuddys: [],
  userList: []
};

const stem = handleActions({
  OPEN_SINGLE_TALK: {
    // 将打开的会话添加到会话里面里面
    next: (state = immutableState, action) => {
      const toBuddy = action.payload.toBuddy;

      let userId;
      if (typeof toBuddy.userId === 'object') {
        userId = Object.assign({}, toBuddy.userId);
      } else {
        userId = toBuddy.userId;
      }
      const copyedToBuddy = Object.assign({}, toBuddy, { userId });
      const toBuddys = _.unionWith(state.toBuddys, [copyedToBuddy], (f, l) => _.isEqual(f.userId, l.userId));
      return Object.assign({}, state, {
        toBuddys
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
  },
  GET_ALL_USERS_SUCCESS: {
    next: (state = immutableState, action) => {
      const uList = _.cloneDeep(action.payload.userList);
      return Object.assign({}, state, {
        userList: uList
      });
    }
  }
}, immutableState);

export const stemKeys = {
  toBuddys: 'toBuddys'
};


export default stem;
