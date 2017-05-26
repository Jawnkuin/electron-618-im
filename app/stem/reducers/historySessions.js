import { handleActions } from 'redux-actions';
import _ from 'lodash';

export default handleActions({
  // 已接受通知
  RECIEVE_MESSAGE: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const infoType = action.payload.infoType;
      // 发送者Id
      let msgSessionId;
      // 最新消息
      let latestMsg;
      if (infoType === 'LIST') {
        msgSessionId = action.payload.msgList[0].fromUserId;
        latestMsg = action.payload.msgList[0];
      }
      if (infoType === 'SINGLE') {
        msgSessionId = action.payload.msg.fromUserId;
        latestMsg = action.payload.msg;
      }

      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, msgSessionId)
      );
      // session exists
      if (sessionIndex >= 0) {
        newState[sessionIndex].latestMsg = latestMsg;
      } else {
        const newSession = {
          fromUserId: msgSessionId,
          latestMsg,
          unReadCnt: 0
        };
        newState.push(newSession);
      }
      return newState;
    }
  },
  // 用户未接收通知
  RECIEVE_UNREAD_MESSAGE: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const msgSessionId = action.payload.fromUserId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, msgSessionId)
      );
      // session exists
      if (sessionIndex >= 0) {
        newState[sessionIndex].latestMsg = action.payload;
        newState[sessionIndex].unReadCnt += 1;
      } else {
        const newSession = {
          fromUserId: action.payload.fromUserId,
          latestMsg: action.payload,
          unReadCnt: 1
        };
        newState.push(newSession);
      }
      return newState;
    }
  },
  ON_LOAD_TALK: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const openedTalkId = action.payload.buddyInfo.userId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, openedTalkId)
      );

      if (sessionIndex >= 0) {
        newState[sessionIndex].unReadCnt = 0;
        return newState;
      }
      return state;
    }
  },
  RECIEVE_UNREAD_MSG_LIST: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const unreadSessionId = action.payload.sessionId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, unreadSessionId)
      );
      const listLength = action.payload.msgList.length;
      if (sessionIndex >= 0) {
        newState[sessionIndex].latestMsg = action.payload.msgList[listLength - 1];
        newState[sessionIndex].unReadCnt += listLength;
      } else {
        const newSession = {
          fromUserId: unreadSessionId,
          latestMsg: action.payload.msgList[listLength - 1],
          unReadCnt: listLength
        };
        newState.push(newSession);
      }
      return newState;
    }
  }
}, []);
