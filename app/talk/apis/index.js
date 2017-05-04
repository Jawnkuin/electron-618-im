import { ipcRenderer } from 'electron';
import { SEND_MESSAGE, MESSAGE_READ_ACK } from '../actions';

// 发送消息
export const sendIpcMessage = (toSid, data) => {
  ipcRenderer.send(SEND_MESSAGE, { toSid, data });
};

// 发送消息已读标记
export const sendIpcMessageReadAck = (senderId, msgId) => {
  ipcRenderer.send(MESSAGE_READ_ACK, { senderId, msgId });
};
