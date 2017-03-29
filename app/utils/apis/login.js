import protobuf from 'protobufjs';
import crypto from 'crypto';
import path from 'path';

import TCPClient from './tcp_client';

const pbPath = path.join(process.cwd(), '/app/utils/apis/pb/IM.Login.proto');

let protoRoot = null;
let IMLoginReq = null;
let userStatType = null;
let clientType = null;
let serviceIdEnums = null;
let loginCmdIdEnums = null;
let IMLoginRes = null;
let tcpClient = null;

const getProtoRoot = () => new Promise((resolve, reject) => {
  protobuf.load(pbPath, (err, pbRoot) => {
    if (err) {
      reject(err);
    }
    resolve(pbRoot);
  });
});

// 加载PB相关配置
const initPb = async () => {
  protoRoot = await getProtoRoot();
  IMLoginReq = protoRoot.lookup('IM.Login.IMLoginReq');
  userStatType = protoRoot.lookup('IM.BaseDefine.UserStatType');
  clientType = protoRoot.lookup('IM.BaseDefine.ClientType');
  serviceIdEnums = protoRoot.lookup('IM.BaseDefine.ServiceID');
  loginCmdIdEnums = protoRoot.lookup('IM.BaseDefine.LoginCmdID');
  IMLoginRes = protoRoot.lookup('IM.Login.IMLoginRes');
};

// 获得PBBody
const getLoginBuf = () => {
  const hash = crypto.createHash('md5').update('11').digest('hex');
  const loginMsg = IMLoginReq.create({
    userName: 'Wu',
    password: hash,
    onlineStatus: userStatType.values.USER_STATUS_ONLINE,
    clientType: clientType.values.CLIENT_TYPE_WINDOWS,
    clientVersion: 'win_10086'
  });
  const loginBuf = IMLoginReq.encode(loginMsg).finish();
  return loginBuf;
};

const onLoginRequest = (res, onLoginOK, onLoginFailed) => {
  console.log(res);
  const loginRes = IMLoginRes.decode(res);
  if (!loginRes) {
    onLoginFailed(new Error('Error on login, server failure'));
  }
  console.log(loginRes);
};

// 执行登录，回调登录成功和登录失败
const doLogin = async (onLoginOK, onLoginFailed) => {
  await initPb();

  const logReqBuf = getLoginBuf();
  const loginServiceId = serviceIdEnums.values.SID_LOGIN;
  const loginReqCmdId = loginCmdIdEnums.values.CID_LOGIN_REQ_USERLOGIN;

  if (!tcpClient) {
    tcpClient = new TCPClient();
  }

  tcpClient.sendPbToServer(logReqBuf, loginServiceId, loginReqCmdId).then(
    (res) => {
      onLoginRequest(res, onLoginOK, onLoginFailed);
    },
    (err) => {
      throw err;
    }
  );
};


export default doLogin;
