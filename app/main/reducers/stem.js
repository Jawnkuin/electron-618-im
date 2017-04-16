import { handleActions } from 'redux-actions';
import _ from 'lodash';

const immutableState = {
  toBuddys: []
};

const stem = handleActions({
  OPEN_SINGLE_TALK: {
    next: (state = immutableState, action) => {
      const toBuddy = action.payload.toBuddy;
      console.log(toBuddy);
      return Object.assign({}, state, {
        toBuddys: _.unionWith(state.toBuddys, [toBuddy], (f, l) => _.isEqual(f.userId, l.userId))
      });
    }
  }
}, immutableState);

export const stemKeys = {
  toBuddys: 'toBuddys'
};


export default stem;
