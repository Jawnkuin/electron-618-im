import protobuf from 'protobufjs';
import path from 'path';
import fs from 'fs';

const protoDir = path.join(process.cwd(), '/app/utils/apis/pb/');
const protoAddrs = fs.readdirSync(protoDir).map(fname => `${protoDir}${fname}`);
const pbRoot = protobuf.loadSync(protoAddrs);

export const IMBaseDefine = pbRoot.lookup('IM.BaseDefine');
export const IMBuddy = pbRoot.lookup('IM.Buddy');
export const IMFile = pbRoot.lookup('IM.File');
export const IMGroup = pbRoot.lookup('IM.Group');
export const IMLogin = pbRoot.lookup('IM.Login');
export const IMMessage = pbRoot.lookup('IM.Message');
export const IMOther = pbRoot.lookup('IM.Other');
export const IMServer = pbRoot.lookup('IM.Server');
export const IMSwitchService = pbRoot.lookup('IM.SwitchService');


// 登录模块响应解析
const loginParser = (pbHeader, pbBodyBuffer) => {
  const IMLoginCmdIDs = IMBaseDefine.LoginCmdID;
  switch (pbHeader.commandId) {
    case IMLoginCmdIDs.CID_LOGIN_RES_USERLOGIN:
      return IMLogin.IMLoginRes.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_RES_LOGINOUT:
      return IMLogin.IMLogoutRsp.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_KICK_USER:
      return IMLogin.IMKickUser.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_RES_DEVICETOKEN:
      return IMLogin.IMDeviceTokenRsp.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_RES_KICKPCCLIENT:
      return IMLogin.IMKickPCClientRsp.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_RES_PUSH_SHIELD:
      return IMLogin.IMPushShieldRsp.decode(pbBodyBuffer);

    case IMLoginCmdIDs.CID_LOGIN_RES_QUERY_PUSH_SHIELD:
      return IMLogin.IMQueryPushShieldRsp.decode(pbBodyBuffer);

    default:
      throw new Error('Error parse Login res');

  }
};

// 好友列表响应解析
const buddyParser = (pbHeader, pbBodyBuffer) => {
  const BCmdIDs = IMBaseDefine.BuddyListCmdID;
  switch (pbHeader.commandId) {
    case BCmdIDs.CID_BUDDY_LIST_RECENT_CONTACT_SESSION_RESPONSE:
      return IMBuddy.IMRecentContactSessionRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_STATUS_NOTIFY:
      return IMBuddy.IMUserStatNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_USER_INFO_RESPONSE:
      return IMBuddy.IMUsersInfoRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_REMOVE_SESSION_RES:
      return IMBuddy.IMRemoveSessionRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_ALL_USER_RESPONSE:
      return IMBuddy.IMAllUserRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_USERS_STATUS_RESPONSE:
      return IMBuddy.IMUsersStatRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_CHANGE_AVATAR_RESPONSE:
      return IMBuddy.IMChangeAvatarRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_PC_LOGIN_STATUS_NOTIFY:
      return IMBuddy.IMPCLoginStatusNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_REMOVE_SESSION_NOTIFY:
      return IMBuddy.IMRemoveSessionNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_DEPARTMENT_RESPONSE:
      return IMBuddy.IMDepartmentRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_AVATAR_CHANGED_NOTIFY:
      return IMBuddy.IMAvatarChangedNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_CHANGE_SIGN_INFO_RESPONSE:
      return IMBuddy.IMChangeSignInfoRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_SIGN_INFO_CHANGED_NOTIFY:
      return IMBuddy.IMSignInfoChangedNotify.decode(pbBodyBuffer);
    default:
      throw new Error('Error parse Buddy res');
  }
};

const IMServiceIDs = IMBaseDefine.ServiceID;

export const pbBodyParser = (pbHeader, pbBodyBuffer) => {
  switch (pbHeader.moduleId) {
    case IMServiceIDs.SID_LOGIN:
      return loginParser(pbHeader, pbBodyBuffer);
    case IMServiceIDs.SID_BUDDY_LIST:
      return buddyParser(pbHeader, pbBodyBuffer);
    default:
      throw new Error('Error parse pbBody');
  }
};
