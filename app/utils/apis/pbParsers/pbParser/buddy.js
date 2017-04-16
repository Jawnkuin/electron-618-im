import { IMBaseDefine, IMBuddy } from '../pbModules';
import actionCreators from '../../../../main/actions';
import mainStore from '../../../../main/store';
import { onBuddyListResponce, onDepListResponce } from '../../stem';

const Actions = actionCreators(mainStore);

// 好友列表响应解析
export default (pbHeader, pbBodyBuffer) => {
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
    // 所有用户响应
    case BCmdIDs.CID_BUDDY_LIST_ALL_USER_RESPONSE:
      {
        onBuddyListResponce({
          header: pbHeader,
          body: IMBuddy.IMAllUserRsp.decode(pbBodyBuffer)
        })(Actions.getAllUserSuccess, Actions.getAllUserFail);
        break;
      }
    case BCmdIDs.CID_BUDDY_LIST_USERS_STATUS_RESPONSE:
      return IMBuddy.IMUsersStatRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_CHANGE_AVATAR_RESPONSE:
      return IMBuddy.IMChangeAvatarRsp.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_PC_LOGIN_STATUS_NOTIFY:
      return IMBuddy.IMPCLoginStatusNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_REMOVE_SESSION_NOTIFY:
      return IMBuddy.IMRemoveSessionNotify.decode(pbBodyBuffer);
    case BCmdIDs.CID_BUDDY_LIST_DEPARTMENT_RESPONSE:
      {
        onDepListResponce({
          header: pbHeader,
          body: IMBuddy.IMDepartmentRsp.decode(pbBodyBuffer)
        })(Actions.getDepSuccess, Actions.getDepFail);
        break;
      }
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
