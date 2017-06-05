import { handleActions } from 'redux-actions';
import _ from 'lodash';

export const immutableState = {
  buddyInfo: {
    buddyInfo: {
      userId: {}
    },
    selfInfo: {
      userId: {}
    }
  }
};

// 对话用户信息
export default handleActions({
  // 用户登录成功
  ON_LOAD_TALK: {
    next: (state = immutableState.buddyInfo, action) => {
      if (typeof state.buddyInfo.userId === 'object' && _.isEmpty(state.buddyInfo.userId)) {
        return _.clone(action.payload);
      }
      return state;
    }
  },
  GET_USERS_STATE_SUCCESS: {
    // action.payload: [{userId,status}]
    // status: 1-ONLINE,2-OFFLINE,3-LEAVE
    next: (state = immutableState.buddyInfo, action) => {
      const userStatList = action.payload;
      if (userStatList && userStatList.length >= 0) {
        const userIndexInStateList = _.findIndex(userStatList, s => _.isEqual(s.userId, state.userId));
        if (userIndexInStateList >= 0) {
          const sessionBuddy = Object.assign(
            {},
            state.buddyInfo,
            { onlineStatus: userStatList[userIndexInStateList].status }
          );
          return Object.assign({}, state, { buddyInfo: sessionBuddy });
        }
      }
      return state;
    }
  }
}, immutableState.buddyInfo);
