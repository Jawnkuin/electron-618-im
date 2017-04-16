import { ipcRenderer } from 'electron';
import { GET_DEPT_LIST, GET_ALL_USERS } from '../actions';

// 获取部门列表
export const getDeptList = (userId, latestUpdateTime) => {
  ipcRenderer.send(GET_DEPT_LIST, { userId, latestUpdateTime });
};

// 获取所有用户
export const getAllUsers = (userId, latestUpdateTime) => {
  ipcRenderer.send(GET_ALL_USERS, { userId, latestUpdateTime });
};
