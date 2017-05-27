import { createAction } from 'redux-actions';

export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export const GET_DEPT_LIST = 'GET_DEPT_LIST';
export const GET_DEPT_LIST_SUCCESS = 'GET_DEPT_LIST_SUCCESS';
export const GET_DEPT_LIST_FAIL = 'GET_DEPT_LIST_FAIL';

export const ON_LOAD_USER = 'ON_LOAD_USER';

export const OPEN_SINGLE_TALK = 'OPEN_SINGLE_TALK';

export const GET_USERS_STATE_SUCCESS = 'GET_USERS_STATE_SUCCESS';

export const GET_RECENT_CONTACT_SESSION = 'GET_RECENT_CONTACT_SESSION';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

export const openSingleTalk = toOpenBuddy => (dispatch, getState) => {
  // 若已经在添加新窗口不响应打开操作避免冲突
  const { loadingNewTalk } = getState().handleState;
  if (loadingNewTalk) {
    return;
  }
  dispatch(createAction(
    OPEN_SINGLE_TALK,
    toBuddy => toBuddy,
    (toBuddy, isLocal = false) => (
      isLocal ? { scope: 'local' } : {}
    )
  )(toOpenBuddy));
};

export const getRecentContactSessions = () => (dispatch, getState) => {
  const { requestingRecentContactSessions } = getState().handleState;
  if (requestingRecentContactSessions) {
    return;
  }
  dispatch(createAction('GET_RECENT_CONTACT_SESSION')());
};
