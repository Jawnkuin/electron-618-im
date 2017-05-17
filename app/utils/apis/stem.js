import { IMBuddy, IMBaseDefine } from './pbParsers/pbModules';
import mainStore from '../../main/store';
import tcpClient from './tcp_client';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const buddyListCmdIdEnums = IMBaseDefine.BuddyListCmdID;

// 所有用户请求格式
const IMAllUserReq = IMBuddy.IMAllUserReq;
// 部门列表请求格式
const IMDepartmentReq = IMBuddy.IMDepartmentReq;
// 用户状态请求
const IMUsersStatReq = IMBuddy.IMUsersStatReq;


// 获得PBBody
const getAllUserReqBuf = (userId, latestUpdateTime) => {
  const allUserReqMsg = IMAllUserReq.create({
    userId,
    latestUpdateTime
  });
  const allUserReqBuf = IMAllUserReq.encode(allUserReqMsg).finish();
  return allUserReqBuf;
};

// 响应接口
export const onBuddyListResponce = res => (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_ALL_USER_RESPONSE !== res.header.commandId) {
    reject(new Error('unmatch commandId'));
  }
  resolve(res.body);
};

// 执行tcp获取用户
export const getAllUser = (uid, latestUpdateTime) => {
  const allUserReqBuf = getAllUserReqBuf(uid, latestUpdateTime);
  const buddyListServiceId = serviceIdEnums.SID_BUDDY_LIST;
  const allUserReqCmdId = buddyListCmdIdEnums.CID_BUDDY_LIST_ALL_USER_REQUEST;

  tcpClient.sendPbToServer(allUserReqBuf, buddyListServiceId, allUserReqCmdId);
};


// 获得PBBody
const getDepListReqBuf = (userId, latestUpdateTime) => {
  const reqMsg = IMDepartmentReq.create({
    userId,
    latestUpdateTime
  });
  const reqBuf = IMDepartmentReq.encode(reqMsg).finish();
  return reqBuf;
};

export const onDepListResponce = res => (onResolve, onReject) => {
  if (!res || !res.header || !res.body) {
    onReject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_DEPARTMENT_RESPONSE !== res.header.commandId) {
    onReject(new Error('Wrong cmd Id'));
    return;
  }
  onResolve(res.body);
};

// 执行tcp获取部门
export const getDepList = (uid, latestUpdateTime) => {
  const reqBuf = getDepListReqBuf(uid, latestUpdateTime);
  const serviceId = serviceIdEnums.SID_BUDDY_LIST;
  const reqCmdId = buddyListCmdIdEnums.CID_BUDDY_LIST_DEPARTMENT_REQUEST;

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};


const getUsersStatReqBuf = (userId, userIdList) => {
  const reqMsg = IMUsersStatReq.create({
    userId,
    userIdList
  });
  const reqBuf = IMUsersStatReq.encode(reqMsg).finish();
  return reqBuf;
};

// 获取用户状态
export const getUsersStatReq = (userIdList) => {
  const userId = mainStore.getState().login.user.userInfo.userId;
  const reqBuf = getUsersStatReqBuf(userId, userIdList);
  const serviceId = serviceIdEnums.SID_BUDDY_LIST;
  const reqCmdId = buddyListCmdIdEnums.CID_BUDDY_LIST_USERS_STATUS_REQUEST;

  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};

// 用户状态检查
export const onUsersStatResponce = res => (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_USERS_STATUS_RESPONSE !== res.header.commandId) {
    reject(new Error('Wrong cmd Id'));
    return;
  }
  resolve(res.body);
};
