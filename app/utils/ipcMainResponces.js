import { ipcMain } from 'electron';
// import { LOGIN } from '../login/actions';
// import { doLogin } from './apis/login';

import { GET_ALL_USERS, GET_DEPT_LIST } from '../stem/actions';
import { getDepList, getAllUser } from './apis/stem';

import { SEND_MESSAGE, MESSAGE_READ_ACK, GET_HISTORY_MESSAGES } from '../talk/actions';
import { sendMessage, msgDataReadAckReq, getHistoryMessages } from './apis/talk';

/*
ipcMain.on(LOGIN, (event, arg) => {
  doLogin(arg.name, arg.psw);
});
*/

ipcMain.on(GET_DEPT_LIST, (e, arg) => {
  getDepList(arg.userId, arg.latestUpdateTime);
});

ipcMain.on(GET_ALL_USERS, (e, arg) => {
  getAllUser(arg.userId, arg.latestUpdateTime);
});

ipcMain.on(SEND_MESSAGE, (e, arg) => {
  sendMessage(arg.toSid, arg.data);
});

ipcMain.on(MESSAGE_READ_ACK, (e, arg) => {
  msgDataReadAckReq(arg.senderId, arg.msgId);
});

ipcMain.on(GET_HISTORY_MESSAGES, (e, arg) => {
  getHistoryMessages(arg.sessionId, arg.endId, arg.count);
});
