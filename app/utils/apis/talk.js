import _ from 'lodash';
import { IMMessage, IMBaseDefine } from './pbParsers/pbModules';
import mainStore from '../../main/store';
import tcpClient from './tcp_client';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const messageCmdIdEnums = IMBaseDefine.MessageCmdID;

const IMMsgData = IMMessage.IMMsgData;

const getMessageBuf = (toSid, data) => {
  // console.log(mainStore.getState().login.userInfo);
  const fromId = mainStore.getState().login.user.userInfo.userId;

  const messageData = IMMsgData.create({
    fromUserId: fromId,
    toSessionId: toSid,
    msgId: 0,
    createTime: new Date().getTime(),
    msgType: IMBaseDefine.MsgType.MSG_TYPE_SINGLE_TEXT,
    msgData: data
  });
  const msgDataBuf = IMMsgData.encode(messageData).finish();
  return msgDataBuf;
};


// 发送消息
export const sendMessage = (toSid, data) => {
  const reqBuf = getMessageBuf(toSid, data);
  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_DATA;

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};


// 获取未读消息数量
export const getUnreadMsgCnt = () => {
  console.log('Echo', 'IMReadMsgCntReq');
  const selfId = mainStore.getState().login.user.userInfo.userId;
  const unReadMsgCntReq = IMMessage.IMUnreadMsgCntReq.create({
    userId: selfId
  });
  const unReadMsgCntReqBuf = IMMessage.IMUnreadMsgCntReq.encode(unReadMsgCntReq).finish();

  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_UNREAD_CNT_REQUEST;

  tcpClient.sendPbToServer(unReadMsgCntReqBuf, serviceId, reqCmdId);
};


// 获得未读消息数量的反馈
export const onUnReadMsgCntResponce = res => (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject('Error Empty res');
  }
  // 其它消息
  if (messageCmdIdEnums.CID_MSG_UNREAD_CNT_RESPONSE !== res.header.commandId) {
    reject('Wrong cmdId');
    return;
  }

  console.log('unReadInfoList', res.body.unreadinfoList);
  // 只有已经打开的会话才进行处理
  const openedSessions = mainStore.getState().stem.toBuddys;
  console.log('openedSessions', openedSessions);
  resolve(res.body.unreadinfoList[0]);
    /*
  unReadInfoList.forEach((ri) => {
    const openedIndex = _.findIndex(openedSessions, session => _.isEqual(session.userId, ri.sessionId));
    // console.log('openedIndex', openedIndex);
    if (openedIndex >= 0) {
      resolve(ri);
    }
  });
    */
};

function getMsgListReqBuf (sessionId, msgIdBegin, msgCnt) {
  const selfId = mainStore.getState().login.user.userInfo.userId;
  const reqBody = IMMessage.IMGetMsgListReq.create({
    userId: selfId,
    sessionType: IMBaseDefine.SessionType.SESSION_TYPE_SINGLE,
    sessionId,
    msgIdBegin,
    msgCnt
  });
  const reqBodyBuf = IMMessage.IMGetMsgListReq.encode(reqBody).finish();
  return reqBodyBuf;
}


// 获取消息列表
export const getMsgList = (sessionId, msgIdBegin, msgCnt) => {
  const reqBodyBuf = getMsgListReqBuf(sessionId, msgIdBegin, msgCnt);
  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_LIST_REQUEST;

  tcpClient.sendPbToServer(reqBodyBuf, serviceId, reqCmdId);
};

// 构造已读信令的消息
function getMsgDataReadAckReqBuf (senderId, msgId) {
  const selfId = mainStore.getState().login.user.userInfo.userId;
  const reqBody = IMMessage.IMMsgDataReadAck.create({
    userId: senderId,
    sessionId: selfId,
    msgId,
    sessionType: IMBaseDefine.SessionType.SESSION_TYPE_SINGLE
  });
  const reqBodyBuf = IMMessage.IMMsgDataReadAck.encode(reqBody).finish();
  return reqBodyBuf;
}

export const msgDataReadAckReq = (senderId, msgId) => {
  const reqBuf = getMsgDataReadAckReqBuf(senderId, msgId);
  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_READ_ACK;

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};


export const onGetMsgListResponce = res => (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject('Error Empty res');
  }
  // 其它消息
  if (messageCmdIdEnums.CID_MSG_LIST_RESPONSE !== res.header.commandId) {
    reject('Wrong cmdId');
    return;
  }

  const msgList = res.body.msgList;
  // 处理每一条消息
  msgList.forEach((msg) => {
    msgDataReadAckReq(msg.fromSessionId, msg.msgId);
    resolve(msg);
  });
};
