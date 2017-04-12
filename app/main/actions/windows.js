import { createAction } from 'redux-actions';

export const ADD_WINDOW = 'ADD_WINDOW';

// 窗口打开事件，更新state
export const addWindowActionCreator =
 dispatch => (...args) =>
 dispatch(createAction(ADD_WINDOW, (windowID, typeName) => ({ windowID, typeName }))(...args));
