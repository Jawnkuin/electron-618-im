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
  // 接收到消息
  // 单个消息每一个都需要标记未读，接收到列表只对最后一个标记未读
  RECIEVE_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const fromUserId = action.payload.fromUserId;
      if (_.isEqual(fromUserId, state.buddyUserId)) {
        const newArray = Array.from(state.msgList);
        const newMsg = action.payload;
        newMsg.readAck = false; // 添加未读标记
        newArray.push(action.payload);
        return Object.assign({}, state, { msgList: newArray });
      }
      return state;
    }
  },
  // 窗体对发送消息事件的响应，与发送到服务器的逻辑
  SEND_MESSAGE: {
    next: (state = immutableState.dlgInfo, action) => {
      const newArray = Array.from(state.msgList);
      newArray.push(action.payload);
      return Object.assign({}, state, { msgList: newArray });
    }
  },
  // 通知服务器已读消息
  MESSAGE_READ_ACK: {
    next: (state = immutableState.dlgInfo, action) => {
      const newArray = Array.from(state.msgList);
      const msgId = action.payload.msgId;
      const msgIndex = _.findIndex(newArray, m => _.isEqual(m.msgId, msgId));
      if (msgIndex >= 0 && !newArray[msgIndex].readAck) {
        newArray[msgIndex].readAck = true;
        return Object.assign({}, state, { msgList: newArray });
      }
      return state;
    }
  }
}, immutableState.dlgInfo);

export default combineReducers({ buddyInfo, dlgInfo });
