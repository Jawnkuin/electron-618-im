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

  // console.log('unReadInfoList', res.body.unreadinfoList);
  // 只有已经打开的会话才进行处理
  // const openedSessions = mainStore.getState().stem.toBuddys;
  // console.log('openedSessions', openedSessions);
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
