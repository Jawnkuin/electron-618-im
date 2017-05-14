import { IMOther, IMBaseDefine } from './pbParsers/pbModules';
import tcpClient from './tcp_client';


const HEART_BEAT_INTERVAL = 8000; // ms, development环境下太频繁会阻塞控制台输出

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const otherCmdIdEnums = IMBaseDefine.OtherCmdID;

// 心跳请求格式
const IMHeartBeat = IMOther.IMHeartBeat;

const getHeartBeatPbObj = () => {
  const beatMsg = IMHeartBeat.create();
  const pbbody = IMHeartBeat.encode(beatMsg).finish();

  const moduleId = serviceIdEnums.SID_OTHER;
  const cmdId = otherCmdIdEnums.CID_OTHER_HEARTBEAT;

  return { pbbody, moduleId, cmdId };
};

export const startHeartBeatLooper = () => {
  tcpClient.startHeartBeatLoop(getHeartBeatPbObj(), HEART_BEAT_INTERVAL);
};

// 更改托盘状态
export const updateTrayStatus = () => {

};
