export const HEADER_LENGTH = 16;
export const VERSION = 1;

export class JKPBHeader {

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
    this.HeaderBuff = Buffer.from(headerBuf);
    this.length = this.HeaderBuff.readUInt32BE(0);
    this.version = this.HeaderBuff.readUInt16BE(4);
    this.flag = this.HeaderBuff.readUInt32BE(6);
    this.moduleId = this.HeaderBuff.readUInt32BE(8);
    this.commandId = this.HeaderBuff.readUInt32BE(10);
    this.seqNumber = this.HeaderBuff.readUInt32BE(12);
    this.reserved = this.HeaderBuff.readUInt32BE(14);
  }
}
