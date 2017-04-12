import { handleActions } from 'redux-actions';

const immutableState = {
};

const login = handleActions({
  LOGIN: { next: (state = immutableState, action) => action.payload }
}, immutableState);

export default login;
