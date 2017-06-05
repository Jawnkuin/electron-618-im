import { createAction } from 'redux-actions';

export const ADD_WINDOW = 'ADD_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

// 窗口打开事件，更新state
export const addWindowActionCreator =
 dispatch => (...args) =>
 dispatch(createAction(
   ADD_WINDOW,
   (windowID, typeName) => ({ windowID, typeName }),
   () => ({ scope: '__ALL__' })
 )(...args));

export const closeWindowActionCreator =
  dispatch => (...args) => {
    dispatch(createAction(CLOSE_WINDOW, (windowID, typeName) => ({ windowID, typeName }))(...args));
  };
