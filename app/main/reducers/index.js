import { combineReducers } from 'redux';
import login from './login';
import windows from './windows';
import stem from './stem';
import talk from './talk';

export default combineReducers({ login, windows, stem, talk });
