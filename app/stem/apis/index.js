import { ipcRenderer } from 'electron';
import { GET_DEPT_LIST, GET_ALL_USERS } from '../actions';

export const getDeptList = (userId, latestUpdateTime) => {
  ipcRenderer.send(GET_DEPT_LIST, { userId, latestUpdateTime });
};


export const getAllUsers = (userId, latestUpdateTime) => {
  ipcRenderer.send(GET_ALL_USERS, { userId, latestUpdateTime });
};
