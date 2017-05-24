import { IMBaseDefine, IMMessage } from '../pbModules';
import Talk from '../../talk';
import getActionCreators from '../../../../main/actions';

export default (pbHeader, pbBodyBuffer) => {
  const Actions = getActionCreators();
  try {
    const IMMessageCmdIDs = IMBaseDefine.MessageCmdID;
    switch (pbHeader.commandId) {
      // 接收到消息
      case IMMessageCmdIDs.CID_MSG_DATA:
        {
          Talk.onMessageGet({
            header: pbHeader,
            body: IMMessage.IMMsgData.decode(pbBodyBuffer)
          })(
            Actions.onReceiveMessage,
            (e) => { throw new Error(`onMessageGet Failure ${e.message}`); }
          );
          break;
        }
      // 服务器接收消息标识
      case IMMessageCmdIDs.CID_MSG_DATA_ACK:
        return ({
          header: pbHeader,
          body: IMMessage.IMMsgDataAck.decode(pbBodyBuffer)
        });
      // 消息已读标识
      case IMMessageCmdIDs.CID_MSG_READ_ACK:
        return ({
          header: pbHeader,
          body: IMMessage.IMMsgDataReadAck.decode(pbBodyBuffer)
        });
      // 消息未读数量响应
      case IMMessageCmdIDs.CID_MSG_UNREAD_CNT_RESPONSE:
        Talk.onUnReadMsgCntResponce({
          header: pbHeader,
          body: IMMessage.IMUnreadMsgCntRsp.decode(pbBodyBuffer)
        })(
          (unreadInfo) => {
            // 获取消息列表
            Talk.getMsgList(
              unreadInfo.sessionId,
              unreadInfo.latestMsgId,
              unreadInfo.unreadCnt
            );
          },
          (e) => { throw new Error(`onUnReadMsgCntResponce Failure ${e.message}`); }
        );
        break;

      // 消息列表响应
      case IMMessageCmdIDs.CID_MSG_LIST_RESPONSE:
        {
          const msgListRes = {
            header: pbHeader,
            body: IMMessage.IMGetMsgListRsp.decode(pbBodyBuffer)
          };
          Talk.onGetMsgListResponce(msgListRes)(
            (msgListRsp) => {
              msgListRsp.msgList.reverse(); // 修改顺序
              // 保证message格式兼容
              msgListRsp.msgList.forEach((e) => {
                e.fromUserId = msgListRsp.sessionId;
                e.toSessionId = msgListRsp.userId;
              });
              Actions.onReceiveUnReadMsgList(msgListRsp);
            }
            ,
            (e) => { throw new Error(`onGetMsgListResponce Failure ${e.message}`); }
          );
          break;
        }

      default:
        throw new Error('Error parse message res');
    }
  } catch (e) {
    console.log('messageParser', e); // eslint-disable-line no-console
  }
};
