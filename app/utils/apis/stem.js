import { IMBuddy, IMBaseDefine } from './pbParsers/pbModules';

import tcpClient from './tcp_client';

// 用来获取service id
const serviceIdEnums = IMBaseDefine.ServiceID;
// 用来获取cmd id
const buddyListCmdIdEnums = IMBaseDefine.BuddyListCmdID;

// 所有用户请求格式
const IMAllUserReq = IMBuddy.IMAllUserReq;
// 部门列表请求格式
const IMDepartmentReq = IMBuddy.IMDepartmentReq;


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
export const onBuddyListResponce = res => (onResolve, onReject) => {
  if (!res || !res.header || !res.body) {
    onReject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_ALL_USER_RESPONSE !== res.header.commandId) {
    return;
  }
  onResolve(res.body);
};

// 执行tcp获取用户
export const getAllUser = (uid, latestUpdateTime) => {
  const allUserReqBuf = getAllUserReqBuf(uid, latestUpdateTime);
  const buddyListServiceId = serviceIdEnums.SID_BUDDY_LIST;
  const allUserReqCmdId = buddyListCmdIdEnums.CID_BUDDY_LIST_ALL_USER_REQUEST;
  if (!tcpClient.client) {
    tcpClient.initConnToServer();
  }
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
  if (!tcpClient.client) {
    tcpClient.initConnToServer();
  }
  tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId);
};
