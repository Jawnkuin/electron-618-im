import net from 'net';

import { HEADER_LENGTH, JKPBHeader } from './JKPBHeader';

const ipaddr = '192.168.8.41';
const port = 8000;

const onReceiveData = (buff) => {
  const resPBHeader = new JKPBHeader();
  try {
    console.log(buff);
    const headerBuf = buff.slice(0, HEADER_LENGTH);
    console.log(headerBuf);

    resPBHeader.unSerialize(headerBuf);
    console.log(resPBHeader);
        /*
    if (buff.length - HEADER_LENGTH <= 0) {
      return;
    }

    const pbBodyBuf = buff.slice(HEADER_LENGTH, buff.length);

    return pbBodyBuf;
        */
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
  async sendPbToServer (pbbody, moduleId, cmdId) {
    await this.initConnToServer();
    return new Promise((resolve) => {
      // 自定义序列号+1
      this.seqNumber += 1;
      const dataBuf = this.getSendPacket(pbbody, moduleId, cmdId, this.seqNumber);
      this.client.write(dataBuf);
      this.client.on('data', (res) => {
        const pbBodyBuf = onReceiveData(res);
        resolve(pbBodyBuf);
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

export default TCPClient;
