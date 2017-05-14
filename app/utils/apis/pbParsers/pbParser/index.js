import loginParser from './login';
import buddyParser from './buddy';
import messageParser from './message';
import otherParser from './other';
import { IMBaseDefine } from '../pbModules';

const IMServiceIDs = IMBaseDefine.ServiceID;

export default (pbHeader, pbBodyBuffer) => {
  switch (pbHeader.moduleId) {
    case IMServiceIDs.SID_LOGIN:
      return loginParser(pbHeader, pbBodyBuffer);
    case IMServiceIDs.SID_BUDDY_LIST:
      return buddyParser(pbHeader, pbBodyBuffer);
    case IMServiceIDs.SID_MSG:
      return messageParser(pbHeader, pbBodyBuffer);
    case IMServiceIDs.SID_OTHER:
      return otherParser(pbHeader, pbBodyBuffer);
    default:
      throw new Error('Unknow MouduleId');
  }
};
