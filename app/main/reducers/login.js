import { handleActions } from 'redux-actions';
import _ from 'lodash';


const immutableState = {
  attempt: {},
  user: {}
};

const login = handleActions({
  LOGIN_SUCCESS: {
    next: (state = immutableState, action) => {
      const user = _.cloneDeep(action.payload.userInfo);
      const attempt = state.attempt;
      const reserveUserData = {
        name: user.userRealName,
        avatarUrl: user.avatarUrl,
        psw: attempt.psw,
        remember: attempt.remember,
        autoLogin: attempt.autoLogin,
        nickName: user.userNickName
      };
      return Object.assign({}, state, {
        user, reserveUserData
      });
    }
  },
  TRY_LOGIN: {
    next: (state = immutableState, action) => {
      const attemptUser = action.payload;
      return Object.assign({}, state, {
        attempt: attemptUser
      });
    }
  }
}, immutableState);

export const loginKeys = {
  user: 'user',
  attempt: 'attempt'
};


export default login;
