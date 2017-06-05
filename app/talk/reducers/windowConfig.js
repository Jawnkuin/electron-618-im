import { handleActions } from 'redux-actions';
import _ from 'lodash';

export const immutableState = {
  windowConfig: {}
};

export default handleActions({
  ADD_WINDOW: {
    next: (state = immutableState.windowConfig, action) => {
      // 一次设定之后不会再变
      if (_.isEmpty(state)) {
        return action.payload;
      }
      return state;
    }
  }
}, immutableState.windowConfig);
