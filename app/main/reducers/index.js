import { combineReducers } from 'redux';
import login from './login';
import windows from './windows';
import buddy from './buddy';

export default combineReducers({ login, windows, buddy });
