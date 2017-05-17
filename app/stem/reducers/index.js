import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

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
        if (userStatList && userStatList.length >= 0) {
          const newUserList = _.cloneDeep(state.userListInfo.userList);
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
          return Object.assign({}, state, { userListInfo:
            Object.assign({}, state.userListInfo, { userList: newUserList }) }
          );
        }
        return state;
      }
    }
  },
  allUsersInfoState
);


const historySessions = handleActions({
  // 已接受通知
  RECIEVE_MESSAGE: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const msgSessionId = action.payload.fromUserId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, msgSessionId)
      );
      // session exists
      if (sessionIndex >= 0) {
        newState[sessionIndex].msgList.push(action.payload);
        newState[sessionIndex].unReadCnt += 0;
      } else {
        const newSession = {
          fromUserId: action.payload.fromUserId,
          msgList: [action.payload],
          unReadCnt: 0
        };
        newState.push(newSession);
      }
      return newState;
    }
  },
  // 用户未接收通知
  RECIEVE_UNREAD_MESSAGE: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const msgSessionId = action.payload.fromUserId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, msgSessionId)
      );
      // session exists
      if (sessionIndex >= 0) {
        newState[sessionIndex].msgList.push(action.payload);
        newState[sessionIndex].unReadCnt += 1;
      } else {
        const newSession = {
          fromUserId: action.payload.fromUserId,
          msgList: [action.payload],
          unReadCnt: 1
        };
        newState.push(newSession);
      }
      return newState;
    }
  },
  ON_LOAD_TALK: {
    next: (state = [], action) => {
      const newState = _.cloneDeep(state);
      const openedTalkId = action.payload.buddyInfo.userId;
      const sessionIndex = _.findIndex(newState, session =>
        _.isEqual(session.fromUserId, openedTalkId)
      );

      if (sessionIndex >= 0) {
        newState[sessionIndex].unReadCnt = 0;
        return newState;
      }
      return state;
    }
  }
}, []);


export default combineReducers({ userInfo, allUsersInfo, historySessions });
