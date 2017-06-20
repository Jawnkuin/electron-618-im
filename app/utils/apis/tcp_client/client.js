const net = require('net');

const ipaddr = '192.168.8.41';
const port = 8000;
const HEADER_LENGTH = 16;
const VERSION = 1;

class JKPBHeader {
  constructor () {
    this.length = 0; // UINT32
    this.version = VERSION; // UINT16
    this.flag = 0; // UINT16
    this.moduleId = 0; // UINT16
    this.commandId = 0; // UINT16
    this.seqNumber = 0; // UINT16
    this.reserved = 0; // UINT16

    this.HeaderBuff = Buffer.allocUnsafe(HEADER_LENGTH);
  }

  serialize () {
    this.HeaderBuff.writeUInt32BE(this.length, 0);
    this.HeaderBuff.writeUInt16BE(this.version, 4);
    this.HeaderBuff.writeUInt16BE(this.flag, 6);
    this.HeaderBuff.writeUInt16BE(this.moduleId, 8);
    this.HeaderBuff.writeUInt16BE(this.commandId, 10);
    this.HeaderBuff.writeUInt16BE(this.seqNumber, 12);
    this.HeaderBuff.writeUInt16BE(this.reserved, 14);
  }

  getSerializedBuffer () {
    this.serialize();
    return this.HeaderBuff;
  }

  unSerialize (headerBuf) {
    if (!headerBuf || !headerBuf.length || headerBuf.length !== HEADER_LENGTH) {
      throw new Error('Error unSerialize header buffer');
    }
    try {
      this.HeaderBuff = Buffer.from(headerBuf);
      this.length = this.HeaderBuff.readUInt32BE(0);
      this.version = this.HeaderBuff.readUInt16BE(4);
      this.flag = this.HeaderBuff.readUInt16BE(6);
      this.moduleId = this.HeaderBuff.readUInt16BE(8);
      this.commandId = this.HeaderBuff.readUInt16BE(10);
      this.seqNumber = this.HeaderBuff.readUInt16BE(12);
      this.reserved = this.HeaderBuff.readUInt16BE(14);
    } catch (e) {
      throw new Error(`Error JKPBHeader unSerialize ${e.message}`);
    }
  }
}


class TCPClient {
  constructor () {
    this.seqNumber = 0;
    this.client = null;
    this.bufList = [];
    this.totalLenth = 0;
    this.resPBHeader = null;
  }

  // 可能一次请求由多个包组成，
  // 根据header声明的长度，来确定是否在某次on data event后执行处理
  checkShouldHandlePackages () {
    // 连接已经断开需要处理
    if (this.client.destroyed) {
      return true;
    }
  }


  // 可能同时会发过来各种东西，需要区分
  // 有多个包的情况
  onReceiveData (buff) {
    try {
      this.bufList.push(buff);
      this.totalLenth += buff.length;

      // buf长度小于header长度
      if (!this.resPBHeader && this.totalLenth < HEADER_LENGTH) {
        return;
      }

      const concatedBuff = Buffer.concat(this.bufList, this.totalLenth);

      if (!this.resPBHeader) {
        this.resPBHeader = new JKPBHeader();

        const headerBuf = concatedBuff.slice(0, HEADER_LENGTH);
        this.resPBHeader.unSerialize(headerBuf);

        if (!this.resPBHeader || !this.resPBHeader.moduleId) {
          throw new Error('Invalid Response Header');
        }
      }

      // 不足协议规定的长度
      if (this.totalLenth < this.resPBHeader.length) {
        return;
        /*
        console.log('onReceiveData', // eslint-disable-line no-console
        `
          ==========================
          totalLength:${this.totalLenth},
          claimedLength:${this.resPBHeader.length},
          buffListLength:${this.bufList.length}
          ==========================
        `
        );
        */
      }

      if (this.totalLenth >= this.resPBHeader.length) {
        // 截取固定长度
        const pbBodyBuf = concatedBuff.slice(HEADER_LENGTH, this.resPBHeader.length);

        // 调用父进程
        process.send({ resPBHeader: this.resPBHeader, pbBodyBuf });

        const claimedLength = this.resPBHeader.length;
        // 还原
        delete this.resPBHeader;
        this.bufList = [];
        this.totalLenth = 0;

        // 如果一个包是多个消息合并
        if (concatedBuff.length - claimedLength > 0) {
          const newBuf = concatedBuff.slice(claimedLength, concatedBuff.length);
          this.onReceiveData(newBuf);
        }

        return;
      }
      throw new Error('Invalid Response');
    } catch (e) {
      // 还原
      if (this.resPBHeader) { delete this.resPBHeader; }
      this.bufList = [];
      this.totalLenth = 0;
      throw new Error(`Error on onReceiveData ${e.message}`);
    }
  }

  // 开启连接
  initConnToServer () {
    if (!this.client) {
      this.client = new net.Socket(); // return a Node socket
      this.client.on('data', (chunck) => {
          // 包含header 和 body的 resData
        try {
          this.onReceiveData(chunck);
        } catch (e) {
          console.log('onDataError', e.message); // eslint-disable-line no-console
        }
      });
      this.client.on('end', () => {
        console.log(`client end ${this.seqNumber}`); // eslint-disable-line no-console
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
    if (!this.client) {
      this.initConnToServer();
    }

    if (pbbody && moduleId && cmdId) {
      // 自定义序列号+1
      this.seqNumber += 1;
      const dataBuf = TCPClient.getSendPacket(pbbody, moduleId, cmdId, this.seqNumber);
      this.client.write(dataBuf);
    }
  }

  static getSendPacket (pbBody, moduleId, cmdId, seq) {
    const mJKPBHeader = new JKPBHeader();


    moduleId && (mJKPBHeader.moduleId = moduleId);
    cmdId && (mJKPBHeader.commandId = cmdId);
    seq && (mJKPBHeader.seqNumber = seq);

    const socketLength = HEADER_LENGTH + pbBody.data.length;
    mJKPBHeader.length = socketLength;
    try {
      // 由PBHeader和PBBody组成

      const pbBodyBuf = Buffer.from(pbBody.data);
      const sendBuffer = Buffer.concat([mJKPBHeader.getSerializedBuffer(), pbBodyBuf], socketLength);

      return sendBuffer;
    } catch (e) {
      throw new Error(`Error on getSendPacket ${e.message}`);
    }
  }
}

const tcpClient = new TCPClient();

process.on('message', (m) => {
  try {
    if (!tcpClient.client || tcpClient.client.destroyed) {
      tcpClient.initConnToServer();
    }
    if (m.s === 'SEND_PB') {
      tcpClient.sendPbToServer(m.pbObj.pbbody, m.pbObj.moduleId, m.pbObj.cmdId);
    }
    if (m.s === 'HEART_BEAT') {
      setInterval(() => {
        tcpClient.sendPbToServer(m.pbObj.pbbody, m.pbObj.moduleId, m.pbObj.cmdId);
      }, m.interval);
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
});
