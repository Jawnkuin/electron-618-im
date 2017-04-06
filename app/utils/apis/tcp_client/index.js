import net from 'net';
import { HEADER_LENGTH, JKPBHeader } from './JKPBHeader';
import { pbBodyParser } from '../pbParsers/pbModules';

const ipaddr = '192.168.8.41';
const port = 8000;

// 可能同时会发过来各种东西，需要区分
const onReceiveData = (buff) => {
  const resPBHeader = new JKPBHeader();
  try {
    const headerBuf = buff.slice(0, HEADER_LENGTH);
    resPBHeader.unSerialize(headerBuf);

    if (!resPBHeader || !resPBHeader.moduleId) {
      throw new Error('Invalid Response Header');
    }
    const pbBodyBuf = buff.slice(HEADER_LENGTH, buff.length);
    const pbBody = pbBodyParser(resPBHeader, pbBodyBuf);
    return {
      header: resPBHeader,
      body: pbBody
    };
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
    return new Promise((resolve) => {
      if (!this.client) {
        this.client = new net.Socket(); // return a Node socket
      }
      if (!this.client.connecting) {
        this.client.connect(port, ipaddr);
        this.client.on('connect', () => resolve());
      }
    });
  }

  /**
  * @pbbody: buffer of pb body
  */
  sendPbToServer (pbbody, moduleId, cmdId) {
    return new Promise((resolve) => {
      // 自定义序列号+1
      this.seqNumber += 1;
      const dataBuf = this.getSendPacket(pbbody, moduleId, cmdId, this.seqNumber);
      this.client.write(dataBuf);
      this.client.on('data', (res) => {
        // 包含header 和 body的 resData
        const resData = onReceiveData(res);
        resolve(resData);
      });
    });
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
