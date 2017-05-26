import { handleActions } from 'redux-actions';
import _ from 'lodash';

/*
unReadInfo{
  buddyinfo{},
  unReadMsgInfo{
    msgs:[]
  }
}
*/
// 从stem窗口打开的对话框
const immutableState = {
  unReadInfos: []
};

const talk = handleActions({
  RECIEVE_UNREAD_MESSAGE: {
    // 将打开的会话添加到会话里面里面
    next: (state = immutableState, action) => {
      const msg = action.payload;
      console.log('RECIEVE_UNREAD_MESSAGE', msg);
      const toBuddyId = msg.fromUserId;
      const newArray = _.cloneDeep(state.unReadInfos);


      const infoIndex = _.findIndex(newArray, uInfo => _.isEqual(uInfo.buddyinfo.userId, toBuddyId));

      if (infoIndex >= 0) {
        newArray[infoIndex].unReadMsgInfo.msgs.push(msg);
      } else {
        const info = {
          buddyinfo: {
            userId: toBuddyId
          },
          unReadMsgInfo: {
            msgs: [msg]
          }
        };
        newArray.push(info);
      }


      return Object.assign({}, state, {
        unReadInfos: newArray
      });
    }
  },
  ON_LOAD_TALK: {
    // 清除mainStore中的对应unReadInfo
    next: (state = immutableState, action) => {
      const openedTalkId = action.payload.buddyInfo.userId;
      const newReadInfos = _.cloneDeep(state.unReadInfos);
      const openedTalkIndex = _.findIndex(newReadInfos, info => _.isEqual(info.buddyinfo.userId, openedTalkId));
      if (openedTalkIndex >= 0) {
        newReadInfos.splice(openedTalkIndex, 1);
        return Object.assign({}, state, {
          unReadInfos: newReadInfos
        });
      }
      return state;
    }
  },
  RECIEVE_UNREAD_MSG_LIST: {
    next: (state = immutableState, action) => {
      const msgListRsp = action.payload;
      let toBuddyId;
      if (typeof msgListRsp.sessionId === 'object') {
        toBuddyId = Object.assign({}, msgListRsp.sessionId);
      } else {
        toBuddyId = msgListRsp.sessionId;
      }
      const newArray = _.cloneDeep(state.unReadInfos);

      const infoIndex = _.findIndex(newArray, uInfo => _.isEqual(uInfo.buddyinfo.userId, toBuddyId));
      if (infoIndex >= 0) {
        newArray[infoIndex].unReadMsgInfo.msgs.concat(msgListRsp.msgList);
      } else {
        const info = {
          buddyinfo: {
            userId: toBuddyId
          },
          unReadMsgInfo: {
            msgs: msgListRsp.msgList
          }
        };
        newArray.push(info);
      }
      return Object.assign({}, state, {
        unReadInfos: newArray
      });
    }
  }
}, immutableState);

export const talkKeys = {
  unReadInfos: 'unReadInfos'
};


export default talk;
