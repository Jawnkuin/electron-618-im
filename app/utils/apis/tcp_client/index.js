import { fork } from 'child_process';
import pbBodyParser from '../pbParsers/pbParser';

const tcpProcess = fork(`${__dirname}/TcpClient.js`);

tcpProcess.on('message', (m) => {
  pbBodyParser(m.resPBHeader, m.pbBodyBuf);
});

export default{
  sendPbToServer: (pbbody, moduleId, cmdId) => {
    tcpProcess.send('socket', { pbbody, moduleId, cmdId });
  }
};
