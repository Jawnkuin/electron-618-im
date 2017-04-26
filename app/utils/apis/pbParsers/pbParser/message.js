import { IMBaseDefine, IMMessage } from '../pbModules';
import { onUnReadMsgCntResponce, getMsgList, onGetMsgListResponce } from '../../talk';
import actionCreators from '../../../../main/actions';
import mainStore from '../../../../main/store';

const Actions = actionCreators(mainStore);

export default (pbHeader, pbBodyBuffer) => {
  try {
    const IMMessageCmdIDs = IMBaseDefine.MessageCmdID;
    switch (pbHeader.commandId) {
      // 接收到消息
      case IMMessageCmdIDs.CID_MSG_DATA:
        {
          console.log('recieve msg', 'CID_MSG_DATA');
          const msgData = {
            header: pbHeader,
            body: IMMessage.IMMsgData.decode(pbBodyBuffer)
          };
          Actions.onReceiveMessage(msgData.body);
          break;
        }
      // 服务器接收消息标识
      case IMMessageCmdIDs.CID_MSG_DATA_ACK:
        console.log('msg ack', 'CID_MSG_DATA_ACK');
        return ({
          header: pbHeader,
          body: IMMessage.IMMsgDataAck.decode(pbBodyBuffer)
        });
      // 消息已读标识
      case IMMessageCmdIDs.CID_MSG_READ_ACK:
        console.log('msg read', 'CID_MSG_READ_ACK');
        return ({
          header: pbHeader,
          body: IMMessage.IMMsgDataReadAck.decode(pbBodyBuffer)
        });
      // 消息未读数量响应
      case IMMessageCmdIDs.CID_MSG_UNREAD_CNT_RESPONSE:
        console.log('msg unread count responce', 'CID_MSG_UNREAD_CNT_RESPONSE');
        onUnReadMsgCntResponce({
          header: pbHeader,
          body: IMMessage.IMUnreadMsgCntRsp.decode(pbBodyBuffer)
        })(
          (unreadInfo) => {
            console.log('Opend Session', unreadInfo);
            // 获取消息列表
            // getMsgList(
            //  unreadInfo.sessionId,
            //  unreadInfo.latestMsgId,
            //  unreadInfo.unreadCnt
            // );
          },
          e => console.log('onUnReadMsgCntResponce Failure', e));
        break;

      // 消息列表响应
      case IMMessageCmdIDs.CID_MSG_LIST_RESPONSE:
        {
          const msgListRes = {
            header: pbHeader,
            body: IMMessage.IMGetMsgListRsp.decode(pbBodyBuffer)
          };
          console.log('msg list responce', 'CID_MSG_LIST_RESPONSE');
          onGetMsgListResponce(msgListRes)(
          Actions.onReceiveMessage,
          (e) => { console.log('onGetMsgListResponce Failure', e); }
        );
          break;
        }

      default:
        console.log('pbHeader', pbHeader);
        throw new Error('Error parse message res');
    }
  } catch (e) {
    throw (new Error(`messageParser ${e.message}`));
  }
};
