import { IMBuddy, IMBaseDefine } from './pbParsers/pbModules';
import tcpClient from './tcp_client';

const IMAllUserReq = IMBuddy.IMAllUserReq;
const serviceIdEnums = IMBaseDefine.ServiceID;

const IMDepartmentReq = IMBuddy.IMDepartmentReq;

const buddyListCmdIdEnums = IMBaseDefine.BuddyListCmdID;


// 获得PBBody
const getAllUserReqBuf = (userId, latestUpdateTime) => {
  const allUserReqMsg = IMAllUserReq.create({
    userId,
    latestUpdateTime
  });
  const allUserReqBuf = IMAllUserReq.encode(allUserReqMsg).finish();
  return allUserReqBuf;
};

const onBuddyListResponce = (res, onResolve, onReject) => {
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

  if (!tcpClient.connecting) {
    tcpClient.initConnToServer();
  }

  return new Promise((resolve, reject) => {
    tcpClient.sendPbToServer(allUserReqBuf, buddyListServiceId, allUserReqCmdId).then(
      (res) => {
        onBuddyListResponce(res, resolve, reject);
      },
      (err) => {
        reject(err);
      }
    );
  });
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

const onDepListResponce = (res, onResolve, onReject) => {
  if (!res || !res.header || !res.body) {
    onReject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_DEPARTMENT_RESPONSE !== res.header.commandId) {
    console.log('res.header.commandId', res.header.commandId);
    console.log('res.header.commandId', res.body);
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

  if (!tcpClient.connecting) {
    tcpClient.initConnToServer();
  }

  return new Promise((resolve, reject) => {
    tcpClient.sendPbToServer(reqBuf, serviceId, reqCmdId).then(
      (res) => {
        onDepListResponce(res, resolve, reject);
      },
      (err) => {
        reject(err);
      }
    );
  });
};
