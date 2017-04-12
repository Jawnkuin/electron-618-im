import { createAction } from 'redux-actions';
// import doLogin from '../../utils/apis/login';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
export const SEND_MESSAGE_SUCCESS = 'LOGIN_SUCCESS';

export const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';

const sendMessageCreator = createAction(SEND_MESSAGE,
  (user, psw) => ({
    name,
    psw
  }),
  (name, psw, isLocal) => (isLocal ? { scope: 'local' } : {})
);

// render和main的action共享，只需要发送一次
export const doLogin = (uname, upsw) => (dispatch) => {
  // 发布到main的action
  dispatch(dologinActionCreator(uname, upsw, false));
};

// 处理登录响应
// 因为登录成功直接在main进程杀掉本窗体进程，只需要处理错误情况
export const doLoginFail = createAction(LOGIN_FAIL,
  errMsg => ({
    errMsg
  }),
  (errMsg, isLocal = true) => (isLocal ? { scope: 'local' } : {})
);
