import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const userInfoState = {
  userInfo: {}
};

const userInfo = handleActions({
  // 用户登录成功
  ON_LOAD_USER: {
    next: (state = userInfoState, action) => action.payload
  }
}, userInfoState);


export const allUsersInfoState = {
  userListInfo: {},
  deptListInfo: {}
};

const allUsersInfo = handleActions(
  {
    GET_ALL_USERS_SUCCESS: {
      next: (state = allUsersInfoState, action) => Object.assign({}, state, {
        userListInfo: action.payload
      })
    },
    GET_DEPT_LIST_SUCCESS: {
      next: (state = allUsersInfoState, action) => {
        console.log(action);
        return Object.assign({}, state, {
          deptListInfo: action.payload
        });
      }
    },
    GET_DEPT_LIST_FAIL: {
      next: (state = allUsersInfoState, action) => {
        console.log(action);
        return Object.assign({}, state, {
          deptListInfo: action.payload
        });
      }
    }
  },
  allUsersInfoState
);

export default combineReducers({ userInfo, allUsersInfo });
