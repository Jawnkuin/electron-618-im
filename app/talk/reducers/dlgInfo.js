import { handleActions } from 'redux-actions';
import _ from 'lodash';

const immutableState = {
  dlgInfo: {
    msgList: [],
    buddyUserId: {},
    hasHistory: true
  }
};

// 消息相关
export default handleActions({
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
      const infoType = action.payload.infoType;
      let fromUserId;

      if (infoType === 'LIST') {
        fromUserId = action.payload.msgList[0].fromUserId;
      }
      if (infoType === 'SINGLE') {
        fromUserId = action.payload.msg.fromUserId;
      }

      if (fromUserId && _.isEqual(fromUserId, state.buddyUserId)) {
        let newArray = _.cloneDeep(state.msgList);
        if (infoType === 'SINGLE') {
          const newMsg = action.payload.msg;
          newMsg.readAck = false; // 添加未读标记
          newArray.push(newMsg);
        }
        if (infoType === 'LIST') {
          const newMsgList = action.payload.msgList;
          newMsgList.forEach((msg) => { msg.readAck = true; });
          newMsgList[newMsgList.length - 1].readAck = false; // 最新标记未读
          newArray = newArray.concat(newMsgList);
        }

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
  },
  // 获得历史消息
  GET_HISTORY_MESSAGES: {
    next: (state = immutableState.dlgInfo, action) => {
      if (_.isEqual(state.buddyUserId, action.payload.sessionId)) {
        // 无更多消息标记为0
        if (action.payload.msgList.length <= 0) {
          return Object.assign({}, state, { hasHistory: false });
        }
        action.payload.msgList.sort((a, b) => a.low - b.low);
        const newArray = Array.from(state.msgList);
        const newMsgList = action.payload.msgList.concat(newArray);
        return Object.assign({}, state, { msgList: newMsgList });
      }

      return state;
    }
  }
}, immutableState.dlgInfo);
