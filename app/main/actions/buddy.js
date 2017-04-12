import { createAction } from 'redux-actions';
import { getAllUser, getDepList } from '../../utils/apis/buddy';
import {
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_DEPT_LIST_SUCCESS,
  GET_DEPT_LIST_FAIL
} from '../../stem/actions';


const getAllUserFailActionCreator = createAction(GET_ALL_USERS_FAIL, errMsg => ({ errMsg }));

const getAllUserSuccessActionCreator = createAction(GET_ALL_USERS_SUCCESS, res => res);


const getDepFailActionCreator = createAction(GET_DEPT_LIST_FAIL, errMsg => ({ errMsg }));

const getDepSuccessActionCreator = createAction(GET_DEPT_LIST_SUCCESS, res => res);

// 主线程调用TCPClient请求所有用户
export const getAllUserMain = dispatch => async (userId, latestUpdateTime) => {
  try {
    const res = await getAllUser(userId, latestUpdateTime);
    dispatch(getAllUserSuccessActionCreator(res));
  } catch (e) {
    console.log(e);
    dispatch(getAllUserFailActionCreator(e.message));
  }
};


export const getDepListMain = dispatch => async (userId, latestUpdateTime) => {
  try {
    const res = await getDepList(userId, latestUpdateTime);
    console.log('getDepListMain', res);
    dispatch(getDepSuccessActionCreator(res));
  } catch (e) {
    console.log(e);
    dispatch(getDepFailActionCreator(e.message));
  }
};
