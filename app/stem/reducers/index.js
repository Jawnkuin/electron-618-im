import { combineReducers } from 'redux';
import userInfo from './userInfo';
import allUsersInfo from './allUsersInfo';
import historySessions from './historySessions';
import handleState from './handleState';


export default combineReducers({ userInfo, allUsersInfo, historySessions, handleState });
