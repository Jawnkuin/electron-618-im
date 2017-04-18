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
    msgList: []
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
  RECIEVE_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const newArray = Array.from(state.msgList);
      newArray.push(action.payload);
      console.log('RECIEVE_MESSAGE', newArray);
      return Object.assign({}, state, { msgList: newArray });
    }
  },
  SEND_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const newArray = Array.from(state.msgList);
      newArray.push(action.payload);
      console.log('SEND_MESSAGE', newArray);
      return Object.assign({}, state, { msgList: newArray });
    }
  }
}, immutableState.dlgInfo);

export default combineReducers({ buddyInfo, dlgInfo });
