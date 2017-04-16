import { IMMessage, IMBaseDefine } from './pbParsers/pbModules';
import mainStore from '../../main/store';
import tcpClient from './tcp_client';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const messageCmdIdEnums = IMBaseDefine.MessageCmdID;

const IMMsgData = IMMessage.IMMsgData;

const getMessageBuf = (toSid, data) => {
  console.log(mainStore.getState().login.userInfo);
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
  if (!tcpClient.client) {
    tcpClient.initConnToServer();
  }
  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};
