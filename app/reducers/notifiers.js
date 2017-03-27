// @flow
import { PUSH_NOTIFIERS, POP_NOTIFIER } from '../actions/notifiers';

const immutableState = {
  notiList: []
};

export default function counter (state = immutableState, action) {
  switch (action.type) {
    case PUSH_NOTIFIERS:
      return state.notiList.concat(action.notis);
    case POP_NOTIFIER:
      return state.notiList.slice(1);
    default:
      return state;
  }
}
