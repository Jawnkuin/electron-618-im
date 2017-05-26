import { handleActions } from 'redux-actions';
import _ from 'lodash';

const allUsersInfoState = {
  userListInfo: [],
  deptListInfo: []
};

export default handleActions(
  {
    GET_ALL_USERS_SUCCESS: {
      next: (state = allUsersInfoState, action) => Object.assign({}, state, {
        userListInfo: action.payload
      })
    },
    GET_DEPT_LIST_SUCCESS: {
      next: (state = allUsersInfoState, action) => Object.assign({}, state, {
        deptListInfo: action.payload
      })
    },
    GET_DEPT_LIST_FAIL: {
      next: (state = allUsersInfoState, action) => Object.assign({}, state, {
        deptListInfo: action.payload
      })
    },
    GET_USERS_STATE_SUCCESS: {
      // action.payload: [{userId,status}]
      // status: 1-ONLINE,2-OFFLINE,3-LEAVE
      next: (state = allUsersInfoState, action) => {
        const userStatList = action.payload;
        console.log('userStatList', userStatList);
        console.log('state', state);
        if (userStatList && userStatList.length >= 0) {
          const newUserList = _.cloneDeep(state.userListInfo);
          newUserList.map((user) => {
            if (!user.onlineStatus) {
              user.onlineStatus = 2; // 在线状态初始化为2
            }
            const userIndexInStateList = _.findIndex(userStatList, s => _.isEqual(s.userId, user.userId));
            if (userIndexInStateList >= 0) {
              user.onlineStatus = userStatList[userIndexInStateList].status;
            }
            return user;
          });
          return Object.assign({}, state, { userListInfo: newUserList });
        }
        return state;
      }
    }
  },
  allUsersInfoState
);
