import { IMMessage, IMBaseDefine } from '../pbParsers/pbModules';
import mainStore from '../../../main/store';
import tcpClient from '../tcp_client';
import { getLocalDb } from '../../database';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const messageCmdIdEnums = IMBaseDefine.MessageCmdID;

const IMMsgData = IMMessage.IMMsgData;

const getMessageBuf = async (toSid, data, msgType = IMBaseDefine.MsgType.MSG_TYPE_SINGLE_TEXT) => {
  // console.log(mainStore.getState().login.userInfo);
  const localDb = await getLocalDb();
  const fromId = mainStore.getState().login.user.userId;

  const messageObj = {
    fromUserId: fromId,
    toSessionId: toSid,
    msgId: 0,
    createTime: new Date().getTime(),
    msgType,
    msgData: data
  };

  const messageData = IMMsgData.create(messageObj);
  // 存入本地消息记录,自己发送的自动标记已读，异步
  localDb.insertMessage(Object.assign(messageObj, { readAck: true }));

  const msgDataBuf = IMMsgData.encode(messageData).finish();
  return msgDataBuf;
};


// 构造已读信令的消息
function getMsgDataReadAckReqBuf (senderId, msgId, sessionType = IMBaseDefine.SessionType.SESSION_TYPE_SINGLE) {
  const selfId = mainStore.getState().login.user.userId;
  const reqBody = IMMessage.IMMsgDataReadAck.create({
    userId: selfId,
    sessionId: senderId,
    msgId,
    sessionType
  });
  const reqBodyBuf = IMMessage.IMMsgDataReadAck.encode(reqBody).finish();
  return reqBodyBuf;
}

// 发送消息
export const sendMessage = async (toSid, data) => {
  const reqBuf = await getMessageBuf(toSid, data);
  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_DATA;

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};

// 对接收的消息标记已收到
const sendMessageAck = (senderId, msgId, sessionType = IMBaseDefine.SessionType.SESSION_TYPE_SINGLE) => {
  const selfId = mainStore.getState().login.user.userId;
  const reqBody = IMMessage.IMMsgDataAck.create({
    userId: senderId,
    sessionId: selfId,
    msgId,
    sessionType
  });
  const reqBodyBuf = IMMessage.IMMsgDataAck.encode(reqBody).finish();

  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_DATA_ACK;

  tcpClient.sendPbToServer(reqBodyBuf, serviceId, reqCmdId);
};

// 接收到消息
export const onMessageGet = res => async (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject('onMessageGet Error Empty res');
  }
  // 其它消息
  if (messageCmdIdEnums.CID_MSG_DATA !== res.header.commandId) {
    reject('onMessageGet Wrong cmdId');
    return;
  }

  sendMessageAck(res.body.fromUserId, res.body.msgId);
  const localDb = await getLocalDb();
  // 存入本地消息记录,接收的自动标记未读读，异步
  localDb.insertMessage(Object.assign({}, res.body, { readAck: false }));

  resolve(res.body);
};

// 发送消息已读信令
export const msgDataReadAckReq = async (senderId, msgId) => {
  const reqBuf = getMsgDataReadAckReqBuf(senderId, msgId);
  const serviceId = serviceIdEnums.SID_MSG;
  const reqCmdId = messageCmdIdEnums.CID_MSG_READ_ACK;

  const localDb = await getLocalDb();
  // 标记已读，异步
  localDb.setMessageReadAck(senderId, msgId);

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};
