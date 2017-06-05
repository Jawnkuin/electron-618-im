import { sendMessage, onMessageGet, msgDataReadAckReq, onMessageDataAck } from './Message';
import { getMsgList, onGetMsgListResponce } from './MessageList';
import { getUnreadMsgCnt, onUnReadMsgCntResponce } from './UnreadMessageCnt';
import getHistoryMessages from './HistoryMessage';

export default {
  // 发送消息(toSid, data)
  sendMessage,
  // 接收消息响应(res => (resolve, reject))
  onMessageGet,
  // 发送消息已读信令(senderId, msgId)
  msgDataReadAckReq,
  // 获取消息列表(sessionId, msgIdBegin, msgCnt)
  getMsgList,
  // 消息列表响应(res => (resolve, reject))
  onGetMsgListResponce,
  // 获取未读消息数量()
  getUnreadMsgCnt,
  // 获得未读消息数量的反馈(res => (resolve, reject))
  onUnReadMsgCntResponce,
  // 服务器接收到本机发送消息做的标记
  onMessageDataAck,
  // 获得本地存储的历史消息
  getHistoryMessages
};
