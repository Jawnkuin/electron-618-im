import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

export const immutableState = {
  buddyInfo: {
    buddyInfo: {
      userId: {}
    },
    selfInfo: {
      userId: {}
    }
  },
  dlgInfo: {
    msgList: [],
    buddyUserId: {}
  }
};

// 对话用户信息
const buddyInfo = handleActions({
  // 用户登录成功
  ON_LOAD_TALK: {
    next: (state = immutableState.buddyInfo, action) => {
      if (typeof state.buddyInfo.userId === 'object' && _.isEmpty(state.buddyInfo.userId)) {
        return _.clone(action.payload);
      }
      return state;
    }
  }
}, immutableState.buddyInfo);


// 消息相关
const dlgInfo = handleActions({
  // 用户登录成功
  ON_LOAD_TALK: {
    next: (state = immutableState.dlgInfo, action) => {
      if (typeof state.buddyUserId === 'object' && _.isEmpty(state.buddyUserId)) {
        return Object.assign({}, state, { buddyUserId: action.payload.buddyInfo.userId });
      }
      return state;
    }
  },
  RECIEVE_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const fromUserId = action.payload.fromUserId;
      if (_.isEqual(fromUserId, state.buddyUserId)) {
        const newArray = Array.from(state.msgList);
        newArray.push(action.payload);
        return Object.assign({}, state, { msgList: newArray });
      }
      return state;
    }
  },
  SEND_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const newArray = Array.from(state.msgList);
      newArray.push(action.payload);
      return Object.assign({}, state, { msgList: newArray });
    }
  }
}, immutableState.dlgInfo);

export default combineReducers({ buddyInfo, dlgInfo });
