import { IMMessage, IMBaseDefine } from '../pbParsers/pbModules';
import mainStore from '../../../main/store';
import tcpClient from '../tcp_client';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const messageCmdIdEnums = IMBaseDefine.MessageCmdID;


// 获取未读消息数量
export const getUnreadMsgCnt = () => {
  // console.log('Echo', 'IMReadMsgCntReq');
  const selfId = mainStore.getState().login.user.userId;
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
  const unReadInfoList = res.body.unreadinfoList;

  if (unReadInfoList && unReadInfoList.length >= 0) {
    unReadInfoList.forEach((unReadInfo) => {
      resolve(unReadInfo);
    });
  }
};
