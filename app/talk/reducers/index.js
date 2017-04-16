import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const buddyInfoState = {
  buddyInfo: {}
};

const buddyInfo = handleActions({
  // 用户登录成功
  ON_LOAD_TALK: {
    next: (state = buddyInfoState, action) => {
      console.log('ON_LOAD_TALK', action);
      return { buddyInfo: action.payload };
    }
  }
}, buddyInfoState);


export default combineReducers({ buddyInfo });
