import { IMBaseDefine, IMMessage } from '../pbModules';


export default (pbHeader, pbBodyBuffer) => {
  try {
    const IMMessageCmdIDs = IMBaseDefine.MessageCmdID;
    switch (pbHeader.commandId) {
      case IMMessageCmdIDs.CID_MSG_DATA_ACK:
        console.log({
          header: pbHeader,
          body: IMMessage.IMMsgDataAck.decode(pbBodyBuffer)
        });
        break;
      case IMMessageCmdIDs.CID_MSG_READ_ACK:
        console.log({
          header: pbHeader,
          body: IMMessage.IMMsgDataReadAck.decode(pbBodyBuffer)
        });
        break;
      default:
        throw new Error('Error parse Login res');
    }
  } catch (e) {
    throw (new Error(`loginParser ${e.message}`));
  }
};
