import { combineReducers } from 'redux';
import login from './login';
import windows from './windows';
import stem from './stem';

export default combineReducers({ login, windows, stem });
