import { handleActions } from 'redux-actions';

const immutableState = {
};

const login = handleActions({
  LOGIN_SUCCESS: {
    next: (state = immutableState, action) => {
      const successRes = action.payload;
      return Object.assign({}, state, {
        successRes
      });
    }
  }
}, immutableState);

export const loginKeys = {
  successRes: 'successRes'
};


export default login;
