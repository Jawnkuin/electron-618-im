import { ipcRenderer } from 'electron';
import { SEND_MESSAGE, MESSAGE_READ_ACK, GET_HISTORY_MESSAGES } from '../actions';

// 发送消息
export const sendIpcMessage = (toSid, data) => {
  ipcRenderer.send(SEND_MESSAGE, { toSid, data });
};

// 发送消息已读标记
export const sendIpcMessageReadAck = (senderId, msgId) => {
  ipcRenderer.send(MESSAGE_READ_ACK, { senderId, msgId });
};

// 查看历史消息，会话ID，最后一个msgId,最大数量
export const getHistoryMessages = (sessionId, endId, maxNum) => {
  ipcRenderer.send(GET_HISTORY_MESSAGES, { sessionId, endId, count: maxNum });
};
