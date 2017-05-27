import { handleActions } from 'redux-actions';

const initHandleState = {
  loadingNewTalk: false, // 防止同时打开多个相同窗口
  requestingRecentContactSessions: false // 防止多次请求最近会话
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
