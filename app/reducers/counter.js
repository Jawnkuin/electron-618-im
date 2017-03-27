// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const immutableState = 0;

export default function counter (state = immutableState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
