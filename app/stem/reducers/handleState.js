import { handleActions } from 'redux-actions';

const initHandleState = {
  loadingNewTalk: false
};

export default handleActions(
  {
    OPEN_SINGLE_TALK: {
      next: (state = initHandleState) => Object.assign({}, state, {
        loadingNewTalk: true
      })
    },
    ON_LOAD_TALK: {
      next: (state = initHandleState) => Object.assign({}, state, {
        loadingNewTalk: false
      })
    }
  },
  initHandleState
);
