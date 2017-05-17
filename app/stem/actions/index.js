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

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

export const openSingleTalk = createAction(OPEN_SINGLE_TALK, toBuddy => ({
  toBuddy
}),
(toBuddy, isLocal = false) => (
  isLocal ? { scope: 'local' } : {}
)
);
