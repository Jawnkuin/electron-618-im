import { createAction } from 'redux-actions';
import {
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_DEPT_LIST_SUCCESS,
  GET_DEPT_LIST_FAIL,
  ON_LOAD_USER
} from '../../stem/actions';


export const onLoadUserActionCreator =
dispatch => (...args) =>
dispatch(createAction(ON_LOAD_USER, user => user, () => ({ scope: 'stem' }))(...args));

export const getAllUserFailActionCreator =
dispatch => (...args) =>
dispatch(createAction(GET_ALL_USERS_FAIL, errMsg => ({ errMsg }), () => ({ scope: 'stem' }))(...args));

export const getAllUserSuccessActionCreator =
dispatch => (...args) => {
  dispatch(createAction(GET_ALL_USERS_SUCCESS, res => res, () => ({ scope: 'stem' }))(...args));
};

export const getDepFailActionCreator =
dispatch => (...args) =>
dispatch(createAction(GET_DEPT_LIST_FAIL, errMsg => ({ errMsg }), () => ({ scope: 'stem' }))(...args));

export const getDepSuccessActionCreator =
dispatch => (...args) => {
  dispatch(createAction(GET_DEPT_LIST_SUCCESS, res => res[0], () => ({ scope: 'stem' }))(args));
};
