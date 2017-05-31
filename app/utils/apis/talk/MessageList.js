import { IMMessage, IMBaseDefine } from '../pbParsers/pbModules';
import mainStore from '../../../main/store';
import tcpClient from '../tcp_client';
import { getLocalDb } from '../../database';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const messageCmdIdEnums = IMBaseDefine.MessageCmdID;

function getMsgListReqBuf (sessionId, msgIdBegin, msgCnt) {
  const selfId = mainStore.getState().login.user.userId;
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


export const onGetMsgListResponce = res => async (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject('Error Empty res');
  }
  // 其它消息
  if (messageCmdIdEnums.CID_MSG_LIST_RESPONSE !== res.header.commandId) {
    reject('Wrong cmdId');
    return;
  }

  res.body.msgList.reverse(); // 修改顺序
  // 保证message格式兼容
  res.body.msgList.forEach((e) => {
    e.fromUserId = res.body.sessionId;
    e.toSessionId = res.body.userId;
  });

  const localDb = await getLocalDb();
  localDb.insertMessageList(res.body.msgList);
  // console.log('msgListBody', res.body);
  resolve(res.body);
  // console.log(msgList);
  // 处理每一条消息
};
