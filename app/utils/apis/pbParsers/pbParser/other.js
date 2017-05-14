import { IMBaseDefine } from '../pbModules';

export default (pbHeader) => {
  try {
    const IMOtherCmdIDs = IMBaseDefine.OtherCmdID;
    switch (pbHeader.commandId) {
      // 接收到HeartBeat Echo
      case IMOtherCmdIDs.CID_OTHER_HEARTBEAT:
        break;
      default:
        throw new Error('Error parse other res');
    }
  } catch (e) {
    throw (new Error(`otherParser ${e.message}`));
  }
};
