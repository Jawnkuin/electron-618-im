import { ipcMain } from 'electron';
import { LOGIN } from '../login/actions';
import { doLogin } from './apis/login';

import { GET_ALL_USERS, GET_DEPT_LIST } from '../stem/actions';
import { getDepList, getAllUser } from './apis/stem';

import { SEND_MESSAGE } from '../talk/actions';
import { sendMessage } from './apis/talk';

ipcMain.on(LOGIN, (event, arg) => {
  doLogin(arg.name, arg.psw);
});

ipcMain.on(GET_DEPT_LIST, (e, arg) => {
  getDepList(arg.userId, arg.latestUpdateTime);
});

ipcMain.on(GET_ALL_USERS, (e, arg) => {
  getAllUser(arg.userId, arg.latestUpdateTime);
});

ipcMain.on(SEND_MESSAGE, (e, arg) => {
  sendMessage(arg.toSid, arg.data);
});
