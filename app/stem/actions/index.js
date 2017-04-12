import { createAction } from 'redux-actions';

// import doLogin from '../../utils/apis/login';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export const GET_DEPT_LIST = 'GET_DEPT_LIST';
export const GET_DEPT_LIST_SUCCESS = 'GET_DEPT_LIST_SUCCESS';
export const GET_DEPT_LIST_FAIL = 'GET_DEPT_LIST_FAIL';


export const TALK = 'TALK';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/
export const getDeptList = createAction(
  GET_DEPT_LIST,
  (userId, latestUpdateTime) => ({
    userId,
    latestUpdateTime
  }),
  (userId, latestUpdateTime, isLocal = false) => (
    isLocal ? { scope: 'local' } : {}
  )
);


export const getAllUsers = createAction(
  GET_ALL_USERS,
  (userId, latestUpdateTime) => ({
    userId,
    latestUpdateTime
  }),
  (userId, latestUpdateTime, isLocal = false) => (
    isLocal ? { scope: 'local' } : {}
  )
);

export const showTalk = createAction(TALK, name => ({
  name,
  id: '001'
}),
(name, isLocal) => (
  isLocal ? { scope: 'local' } : {}
)
);
