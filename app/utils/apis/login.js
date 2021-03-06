import crypto from 'crypto';

import { IMLogin, IMBaseDefine } from './pbParsers/pbModules';
import tcpClient from './tcp_client';

const IMLoginReq = IMLogin.IMLoginReq;
const userStatType = IMBaseDefine.UserStatType;
const clientType = IMBaseDefine.ClientType;
const serviceIdEnums = IMBaseDefine.ServiceID;

const loginCmdIdEnums = IMBaseDefine.LoginCmdID;


// 获得PBBody
const getLoginBuf = (name, psw) => {
  const hash = crypto.createHash('md5').update(psw).digest('hex');
  const loginMsg = IMLoginReq.create({
    userName: name,
    password: hash,
    onlineStatus: userStatType.USER_STATUS_ONLINE,
    clientType: clientType.CLIENT_TYPE_WINDOWS,
    clientVersion: 'win_10086'
  });
  const loginBuf = IMLoginReq.encode(loginMsg).finish();
  return loginBuf;
};

export const onLoginResponce = res => (onLoginOK, onLoginFailed) => {
  if (!res || !res.header || !res.body) {
    onLoginFailed('Error Empty res');
  }
  // 其它消息
  if (loginCmdIdEnums.CID_LOGIN_RES_USERLOGIN !== res.header.commandId) {
    onLoginFailed('Wrong cmdId');
    return;
  }

  switch (res.body.resultCode) {
    case IMBaseDefine.ResultType.REFUSE_REASON_NO_MSG_SERVER:
    case IMBaseDefine.ResultType.REFUSE_REASON_MSG_SERVER_FULL:
    case IMBaseDefine.ResultType.REFUSE_REASON_NO_DB_SERVER:
    case IMBaseDefine.ResultType.REFUSE_REASON_NO_LOGIN_SERVER:
    case IMBaseDefine.ResultType.REFUSE_REASON_NO_ROUTE_SERVER:
    case IMBaseDefine.ResultType.REFUSE_REASON_DB_VALIDATE_FAILED:
    case IMBaseDefine.ResultType.REFUSE_REASON_VERSION_TOO_OLD:
      onLoginFailed(res.body.resultString);
      break;
    case IMBaseDefine.ResultType.REFUSE_REASON_NONE:
      onLoginOK(res.body);
      break;
    default:
      onLoginFailed('未知错误');
  }
};

// 执行登录，回调登录成功和登录失败
export const doLogin = (name, psw) => {
  const logReqBuf = getLoginBuf(name, psw);
  const loginServiceId = serviceIdEnums.SID_LOGIN;
  const loginReqCmdId = loginCmdIdEnums.CID_LOGIN_REQ_USERLOGIN;


  tcpClient.sendPbToServer(logReqBuf, loginServiceId, loginReqCmdId);
};
