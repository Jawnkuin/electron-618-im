import { ipcRenderer } from 'electron';
import { LOGIN } from '../actions';

export default (name, psw) => {
  ipcRenderer.send(LOGIN, { name, psw });
};
