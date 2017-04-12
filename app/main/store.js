import {
  forwardToRenderer,
  triggerAlias
} from 'electron-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// 保证单例的mainStore
const store = createStore(rootReducer, applyMiddleware(
  triggerAlias,
  forwardToRenderer
));


export default store;
