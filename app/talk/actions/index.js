import { createAction } from 'redux-actions';
// import doLogin from '../../utils/apis/login';

export const ON_LOAD_TALK = 'ON_LOAD_TALK';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';


export const CLOSE_SINGLE_TALK = 'CLOSE_SINGLE_TALK';
export const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';

export const sendMessage = createAction(SEND_MESSAGE,
  (fromUserId, createTime, msgData, msgId) => ({
    fromUserId,
    createTime,
    msgData,
    msgId
  }),
  () => ({ scope: 'local' })
);


// 向着主线程
export const closeSingleTalk = createAction(CLOSE_SINGLE_TALK,
  toBuddy => ({ toBuddy })
);
