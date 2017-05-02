import { fork } from 'child_process';
import pbBodyParser from '../pbParsers/pbParser';

const tcpProcess = fork(`${__dirname}/TcpClient.js`);


tcpProcess.on('message', (m) => {
  console.log('parent', m);
  pbBodyParser(m.resPBHeader, m.pbBodyBuf);
});

export default{
  sendPbToServer: (pbbody, moduleId, cmdId) => {
    console.log(tcpProcess);
    tcpProcess.send({ pbbody, moduleId, cmdId });
  }
};
