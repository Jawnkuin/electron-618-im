import crypto from 'crypto';

import tcpClient from './tcp_client';
import { IMLogin, IMBaseDefine } from './pbParsers/pbModules';

const IMLoginReq = IMLogin.IMLoginReq;
const userStatType = IMBaseDefine.UserStatType;
const clientType = IMBaseDefine.ClientType;
const serviceIdEnums = IMBaseDefine.ServiceID;

const loginCmdIdEnums = IMBaseDefine.LoginCmdID;


// 获得PBBody
const getLoginBuf = () => {
  const hash = crypto.createHash('md5').update('11').digest('hex');
  const loginMsg = IMLoginReq.create({
    userName: 'Wu',
    password: hash,
    onlineStatus: userStatType.USER_STATUS_ONLINE,
    clientType: clientType.CLIENT_TYPE_WINDOWS,
    clientVersion: 'win_10086'
  });
  const loginBuf = IMLoginReq.encode(loginMsg).finish();
  return loginBuf;
};

const onLoginResponce = (res, onLoginOK, onLoginFailed) => {
  if (!res || !res.header || !res.body) {
    throw new Error('Error Empty res');
  }
  // 其它消息
  if (loginCmdIdEnums.CID_LOGIN_RES_USERLOGIN !== res.header.commandId) {
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
      onLoginFailed(new Error(res.body.resultString));
      break;
    case IMBaseDefine.ResultType.REFUSE_REASON_NONE:
      onLoginOK(res.body);
      break;
    default:
      onLoginFailed(new Error('未知错误'));
  }
};

// 执行登录，回调登录成功和登录失败
const doLogin = () => {
  const logReqBuf = getLoginBuf();
  const loginServiceId = serviceIdEnums.SID_LOGIN;
  const loginReqCmdId = loginCmdIdEnums.CID_LOGIN_REQ_USERLOGIN;

  if (!tcpClient.connecting) {
    tcpClient.initConnToServer();
  }

  return new Promise((resolve, reject) => {
    tcpClient.sendPbToServer(logReqBuf, loginServiceId, loginReqCmdId).then(
      (res) => {
        onLoginResponce(res, resolve, reject);
      },
      (err) => {
        reject(err);
      }
    );
  });
};


export default doLogin;
