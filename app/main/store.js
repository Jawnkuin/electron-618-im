import {
  forwardToRenderer
} from 'electron-window-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// 保证单例的mainStore
const store = createStore(rootReducer, applyMiddleware(
  forwardToRenderer
));


export default store;
