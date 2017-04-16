import { handleActions } from 'redux-actions';

const immutableState = {
};

const login = handleActions({
  LOGIN_SUCCESS: {
    next: (state = immutableState, action) => {
      const successRes = action.payload;
      return Object.assign({}, state, {
        user: successRes
      });
    }
  }
}, immutableState);

export const loginKeys = {
  user: 'user'
};


export default login;
