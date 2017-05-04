import { createAction } from 'redux-actions';
import { sendIpcMessage, sendIpcMessageReadAck } from '../apis';
// import doLogin from '../../utils/apis/login';

export const ON_LOAD_TALK = 'ON_LOAD_TALK';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';


export const CLOSE_SINGLE_TALK = 'CLOSE_SINGLE_TALK';
export const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';

export const RECIEVE_UNREAD_MESSAGE = 'RECIEVE_UNREAD_MESSAGE';

export const MESSAGE_READ_ACK = 'MESSAGE_READ_ACK';

const sendMessageActionCreator = createAction(SEND_MESSAGE,
(fromUserId, createTime, msgData, msgId) => ({
  fromUserId,
  createTime,
  msgData,
  msgId
}),
() => ({ scope: 'local' })
);

export const sendMessage = (fromUserId, createTime, msgData, msgId) => (dispatch, getState) => {
  // 用于向服务器发消息
  const { dlgInfo } = getState();
  sendIpcMessage(dlgInfo.buddyUserId, msgData);
  return dispatch(sendMessageActionCreator(fromUserId, createTime, msgData, msgId));
};


// 向着主线程发送关闭
export const closeSingleTalk = createAction(CLOSE_SINGLE_TALK,
  toBuddy => ({ toBuddy })
);

// 主线程接收用于更新未读消息状态， 渲染线程接收用于避免重复发送消息已读请求
const sendMessageReadAckActionCreator = createAction(MESSAGE_READ_ACK, (senderId, msgId) =>
({ senderId, msgId }));

export const sendMessageReadAck = (senderId, msgId) => (dispatch) => {
  // 用于向服务器发消息
  sendIpcMessageReadAck(senderId, msgId);
  return dispatch(sendMessageReadAckActionCreator(senderId, msgId));
};
