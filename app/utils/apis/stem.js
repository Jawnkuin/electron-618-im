import _ from 'lodash';
import Long from 'long';
import { IMBuddy, IMBaseDefine } from './pbParsers/pbModules';
import mainStore from '../../main/store';
import tcpClient from './tcp_client';
import { getLocalDb, getAccountConfigDb } from '../../utils/database';

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
export const onBuddyListResponce = res => async (resolve, reject) => {
  if (!res || !res.header || !res.body) {
    reject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_ALL_USER_RESPONSE !== res.header.commandId) {
    reject(new Error('unmatch commandId'));
  }

  try {
    let buddyList = null;
    // const localDb = await getLocalDb();
    buddyList = res.body.userList;
    // 如果请求里面含有buddyList插入
    // 没有则从数据库获取
    /*
    if (!buddyList || _.isEmpty(buddyList)) {
      console.time('getAllDepartmentInfo');
      const deptListsModel = await localDb.getAllDepartmentInfo();
      console.timeEnd('getAllDepartmentInfo');
      // 转回long型
      deptList = deptListsModel.map((dept) => {
        const deptObj = dept.toJSON();
        deptObj.deptId = Long.fromString(deptObj.deptId, true);
        deptObj.parentDeptId = Long.fromString(deptObj.parentDeptId, true);
        return deptObj;
      });
    } else {
      await Promise.all(deptList.map(dept => localDb.insertDepartmentInfoEntity(dept)));
      const configDb = getAccountConfigDb();
      configDb.setDepartmentLastUpdateTime(res.body.latestUpdateTime);
    }
    */
    if (buddyList) {
      resolve(buddyList);
    }
  } catch (e) {
    console.log(e);
  }
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

export const onDepListResponce = res => async (onResolve, onReject) => {
  if (!res || !res.header || !res.body) {
    onReject(new Error('Error Empty res'));
  }
  // 其它消息
  if (buddyListCmdIdEnums.CID_BUDDY_LIST_DEPARTMENT_RESPONSE !== res.header.commandId) {
    onReject(new Error('Wrong cmd Id'));
    return;
  }

  try {
    let deptList = null;
    const localDb = await getLocalDb();
    deptList = res.body.deptList;
    // 如果请求里面含有deptlist插入
    // 没有则从数据库获取
    if (!deptList || _.isEmpty(deptList)) {
      console.time('getAllDepartmentInfo');
      const deptListsModel = await localDb.getAllDepartmentInfo();
      console.timeEnd('getAllDepartmentInfo');
      // 转回long型
      deptList = deptListsModel.map((dept) => {
        const deptObj = dept.toJSON();
        deptObj.deptId = Long.fromString(deptObj.deptId, true);
        deptObj.parentDeptId = Long.fromString(deptObj.parentDeptId, true);
        return deptObj;
      });
    } else {
      await Promise.all(deptList.map(dept => localDb.insertDepartmentInfoEntity(dept)));
      const configDb = getAccountConfigDb();
      configDb.setDepartmentLastUpdateTime(res.body.latestUpdateTime);
    }

    if (deptList) {
      onResolve(deptList);
    }
  } catch (e) {
    console.log(e);
  }
};

// 执行tcp获取部门
export const getDepList = (uid) => {
  // 获取最新的时间，configDb放到函数里面
  const configDb = getAccountConfigDb();
  const deptLatestUpdateTime = configDb.getDepartmentLastUpdateTime();
  const reqBuf = getDepListReqBuf(uid, deptLatestUpdateTime);
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
