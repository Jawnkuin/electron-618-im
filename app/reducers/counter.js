// @flow
import { handleActions } from 'redux-actions';

const immutableState = 0;

const counter = handleActions({
  INCREMENT_COUNTER: state => state + 1,
  DECREMENT_COUNTER: state => state - 1
}, immutableState);

export default counter;
