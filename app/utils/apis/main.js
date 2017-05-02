import { IMOther, IMBaseDefine } from './pbParsers/pbModules';
import tcpClient from './tcp_client';
import { getUnreadMsgCnt } from './talk';

const HEART_BEAT_INTERVAL = 8000; // ms, development环境下太频繁会阻塞控制台输出

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const otherCmdIdEnums = IMBaseDefine.OtherCmdID;

// 心跳请求格式
const IMHeartBeat = IMOther.IMHeartBeat;

const sendHeartBeat = () => {
  console.log('Echo', 'IMHeartBeat');
  console.time('heartbeat');
  const beatMsg = IMHeartBeat.create();
  const beatBuf = IMHeartBeat.encode(beatMsg).finish();

  const serviceId = serviceIdEnums.SID_OTHER;
  const reqCmdId = otherCmdIdEnums.CID_OTHER_HEARTBEAT;
  if (!tcpClient.client) {
    tcpClient.initConnToServer();
  }
  tcpClient.sendPbToServer(beatBuf, serviceId, reqCmdId);
};

export const heartBeatRecall = () => {
  getUnreadMsgCnt();
};

export const startHeartBeatLooper = () => {
  console.log('startHeartBeatLooper', this);
  setInterval(sendHeartBeat, HEART_BEAT_INTERVAL);
};
