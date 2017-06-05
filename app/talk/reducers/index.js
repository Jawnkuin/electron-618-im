import { combineReducers } from 'redux';
import windowConfig from './windowConfig';
import buddyInfo from './buddyInfo';
import dlgInfo from './dlgInfo';


export default combineReducers({ windowConfig, buddyInfo, dlgInfo });
