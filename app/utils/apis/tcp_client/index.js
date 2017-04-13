import net from 'net';
import { HEADER_LENGTH, JKPBHeader } from './JKPBHeader';
import pbBodyParser from '../pbParsers/pbParser';

const ipaddr = '192.168.8.41';
const port = 8000;

// 可能同时会发过来各种东西，需要区分
// 有多个包的情况 ，考虑采用readStream的方式做
const onReceiveData = (buff) => {
  const resPBHeader = new JKPBHeader();
  try {
    const headerBuf = buff.slice(0, HEADER_LENGTH);
    resPBHeader.unSerialize(headerBuf);
    console.log('buffClaimLenth', resPBHeader.length);
    console.log('actualLenth', buff.length);
    if (!resPBHeader || !resPBHeader.moduleId) {
      throw new Error('Invalid Response Header');
    }
    // console.log('HEADER_LENGTH', HEADER_LENGTH); // eslint-disable-line no-console
    // console.log('buff.length', buff.length); // eslint-disable-line no-console
    const pbBodyBuf = buff.slice(HEADER_LENGTH, buff.length);
    pbBodyParser(resPBHeader, pbBodyBuf);
  } catch (e) {
    throw new Error(`Error on onReceiveData ${e.message}`);
  }
};


class TCPClient {
  constructor () {
    this.seqNumber = 0;
    this.mJKPBHeader = null;
    this.client = null;
    this.response = null;
  }

  initConnToServer () {
    if (!this.client) {
      console.log('initConnToServer'); // eslint-disable-line no-console
      this.client = new net.Socket(); // return a Node socket
      console.log('initConnToServer connecting'); // eslint-disable-line no-console
      // this.client.setKeepAlive(true, 10000);
      let bufList = [];
      let totalLen = 0;
      this.client.on('connect', () => console.log('onConnect'));
      this.client.on('data', (chunck) => {
          // 包含header 和 body的 resData
        try {
          onReceiveData(chunck);
        } catch (e) {
          console.log('onData', bufList.length);
          console.log('client', this.client);
          bufList.push(chunck);
          totalLen += chunck.length;
        }
      });
      this.client.on('end', () => {
        try {
          const resBuf = Buffer.concat(bufList, totalLen);
          onReceiveData(resBuf);
        } catch (e) {
          console.log(e);
          // eslint-disable-line no-console
        } finally {
          bufList = [];
          totalLen = 0;
        }
        console.log(`client end ${this.seqNumber}`);
      });
      if (!this.client.connecting) {
        this.client.connect(port, ipaddr);
      }
    }

    if (this.client.destroyed) {
      this.seqNumber = 0;
      this.client.connect(port, ipaddr);
    }
  }

  /**
  * @pbbody: buffer of pb body
  */
  sendPbToServer (pbbody, moduleId, cmdId) {
    console.log('sendPbToServer', this.client.connecting);

    this.initConnToServer();


      // 自定义序列号+1
    this.seqNumber += 1;
    const dataBuf = this.getSendPacket(pbbody, moduleId, cmdId, this.seqNumber);
    this.client.write(dataBuf, (e) => { console.log(e); });
  }

  getSendPacket (pbBody, moduleId, cmdId, seq) {
    if (!this.mJKPBHeader) {
      this.mJKPBHeader = new JKPBHeader();
    }

    moduleId && (this.mJKPBHeader.moduleId = moduleId);
    cmdId && (this.mJKPBHeader.commandId = cmdId);
    seq && (this.mJKPBHeader.seqNumber = seq);

    const socketLength = HEADER_LENGTH + pbBody.length;
    this.mJKPBHeader.length = socketLength;
    try {
      // 由PBHeader和PBBody组成
      const sendBuffer = Buffer.allocUnsafe(socketLength);

      this.mJKPBHeader.getSerializedBuffer().copy(sendBuffer, 0);

      pbBody.copy(sendBuffer, HEADER_LENGTH);
      // 保证每次发送pbheader是一个新的
      delete this.mJKPBHeader;
      // 保证每次接收的res是新的
      delete this.response;

      return sendBuffer;
    } catch (e) {
      throw new Error(`Error on getSendPacket ${e.message}`);
    }
  }
}


export default new TCPClient();
