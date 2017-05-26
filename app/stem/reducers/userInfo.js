import { handleActions } from 'redux-actions';

const userInfoState = {
  userInfo: {}
};

export default handleActions({
  // 用户登录成功
  ON_LOAD_USER: {
    next: (state = userInfoState, action) => action.payload
  }
}, userInfoState);
