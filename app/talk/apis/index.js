import { ipcRenderer } from 'electron';
import { SEND_MESSAGE } from '../actions';

// 发送消息
export const sendIpcMessage = (toSid, data) => {
  console.log(toSid, data);
  ipcRenderer.send(SEND_MESSAGE, { toSid, data });
};
