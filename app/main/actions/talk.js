import { createAction } from 'redux-actions';
import _ from 'lodash';
import {
  ON_LOAD_TALK,
  RECIEVE_MESSAGE,
  RECIEVE_UNREAD_MESSAGE,
  RECIEVE_UNREAD_MSG_LIST
} from '../../talk/actions';

// 更改以获得onread消除
export const onLoadTalkActionCreator =
dispatch => (...args) => {
  dispatch(createAction(ON_LOAD_TALK, toBuddy => (toBuddy), () => ({ scope: '__ALL__' }))(...args));
};

// Got a message from server
// If the session is opened,dispatch a 'RECIEVE_MESSAGE' action
// Else dispatch a 'RECIEVE_UNREAD_MESSAGE' action
export const onReceiveMessageActionCreator =
(dispatch, getState) => (...args) => {
  const { toBuddys } = getState().stem;
  const inMsg = args[0];
  let msgFromUserId;
  // the id from pb may not a plain Object
  // use Object.assign() to change it to a plain object without former __proto__
  if (typeof inMsg.fromUserId === 'object') {
    msgFromUserId = Object.assign({}, inMsg.fromUserId);
  } else {
    msgFromUserId = inMsg.fromUserId;
  }

  inMsg.fromUserId = msgFromUserId;

  const index = _.findIndex(toBuddys, bd => _.isEqual(msgFromUserId, bd.userId));
  if (index >= 0) {
    // to all renderer process
    dispatch(createAction(RECIEVE_MESSAGE, msg => (
      { infoType: 'SINGLE', msg }
    ), () => ({ scope: '__ALL__' }))(inMsg));
  } else {
    // to main process & renderer stem
    dispatch(createAction(RECIEVE_UNREAD_MESSAGE, msg => msg, () => ({ scope: 'stem' }))(inMsg));
  }
};

export const checkUnreadMessageActionCreator =
dispatch => (...args) => dispatch(
  createAction(RECIEVE_MESSAGE, msgList => ({ infoType: 'LIST', msgList }), () => ({ scope: 'talk' })
)(...args));

export const onReceiveUnReadMsgListActionCreator =
dispatch => (...args) => {
  dispatch(createAction(
    RECIEVE_UNREAD_MSG_LIST,
    msgListRsp => msgListRsp,
    () => ({ scope: '__ALL__' }))(...args));
};
