import { fork } from 'child_process';
import pbBodyParser from '../pbParsers/pbParser';
import { TCP_CHILD_PATH } from '../../../configs';


// 将tcp所有的行为放到子进程中，用send和on与子进程通信
const tcpProcess = fork(TCP_CHILD_PATH);

const SEND_PB = 'SEND_PB';
const HEART_BEAT = 'HEART_BEAT';

function onExit () {
  console.log('Process Exit');
  tcpProcess.kill('SIGINT');
  process.exit(0);
}

// process.on('SIGINT', onExit);
process.on('exit', onExit);

tcpProcess.on('message', (m) => {
  const bodyNodeBuffer = Buffer.from(m.pbBodyBuf);
  pbBodyParser(m.resPBHeader, bodyNodeBuffer);
  // 跨进程的buffer对象需要重新实例化
  if (m.resPBHeader.moduleId !== 7) {
    console.log(
      `GET ServiceID:${m.resPBHeader.moduleId.toString(16)}`,
      `cmdId:${m.resPBHeader.commandId.toString(16)}`
    );
  }
});

export default{
  // 普通通信
  sendPbToServer: (pbbody, moduleId, cmdId) => {
    tcpProcess.send({ s: SEND_PB, pbObj: { pbbody, moduleId, cmdId } });
    console.log(
        `SEND ServiceID:${moduleId.toString(16)}`,
        `cmdId:${cmdId.toString(16)}`
      );
  },
  // 心跳
  // pbObj = {pbbody, moduleId, cmdId}
  startHeartBeatLoop: (pbObj, interval) => {
    tcpProcess.send({ s: HEART_BEAT, pbObj, interval });
  }
};
