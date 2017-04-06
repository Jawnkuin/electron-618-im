// @flow
import { handleActions } from 'redux-actions';

const immutableState = 0;

const counter = handleActions({
  INCREMENT_COUNTER: { next: (state, action) => state + action.payload },
  DECREMENT_COUNTER: state => state - 1
}, immutableState);

export default counter;
