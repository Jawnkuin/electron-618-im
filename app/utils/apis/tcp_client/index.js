import { fork } from 'child_process';
import pbBodyParser from '../pbParsers/pbParser';

// 将tcp所有的行为放到子进程中，用send和on与子进程通信
const tcpProcess = fork(`${__dirname}/client.js`);

const SEND_PB = 'SEND_PB';
const HEART_BEAT = 'HEART_BEAT';


tcpProcess.on('message', (m) => {
  // 跨进程的buffer对象需要重新实例化
  const bodyNodeBuffer = Buffer.from(m.pbBodyBuf);
  pbBodyParser(m.resPBHeader, bodyNodeBuffer);
});

export default{
  // 普通通信
  sendPbToServer: (pbbody, moduleId, cmdId) => {
    tcpProcess.send({ s: SEND_PB, pbObj: { pbbody, moduleId, cmdId } });
  },
  // 心跳
  // pbObj = {pbbody, moduleId, cmdId}
  startHeartBeatLoop: (pbObj, interval) => {
    tcpProcess.send({ s: HEART_BEAT, pbObj, interval });
  }
};
