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
    let allUsersModelList = [];
    const localDb = await getLocalDb();
    buddyList = res.body.userList;
    // 如果请求里面含有buddyList插入
    // 没有则从数据库获取

    if (!buddyList || _.isEmpty(buddyList)) {
      console.time('getAllUsersInfo');
      allUsersModelList = await localDb.getAllUsersInfo();
      console.timeEnd('getAllUsersInfo');
    } else {
      console.time('insertUserInfoEntitys');
      // buddyList.map(user => localDb.upsertUserInfoEntity(user));
      allUsersModelList = _.flatten(await localDb.upsertMultiUserInfoEntity(buddyList));
      console.timeEnd('insertUserInfoEntitys');
      const configDb = getAccountConfigDb();
      configDb.setUserLastUpdateTime(res.body.latestUpdateTime);
    }

    // 转回long型
    buddyList = allUsersModelList.map((user) => {
      const userObj = user.toJSON();
      userObj.userId = Long.fromString(userObj.userId, true);
      userObj.departmentId = Long.fromString(userObj.departmentId, true);
      return userObj;
    });
    if (buddyList) {
      resolve(buddyList);
    }
  } catch (e) {
    console.log(e);
  }
};

// 执行tcp获取用户
export const getAllUser = (uid) => {
  // 获取最新的时间，configDb放到函数里面
  const configDb = getAccountConfigDb();
  const userLatestUpdateTime = configDb.getUserLastUpdateTime();
  const allUserReqBuf = getAllUserReqBuf(uid, userLatestUpdateTime);
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
    let deptModelLists = [];
    const localDb = await getLocalDb();
    deptList = res.body.deptList;
    // 如果请求里面含有deptlist插入
    // 没有则从数据库获取
    if (!deptList || _.isEmpty(deptList)) {
      console.time('getAllDepartmentInfo');
      deptModelLists = await localDb.getAllDepartmentInfo();
      console.timeEnd('getAllDepartmentInfo');
    } else {
      console.time('insertDepartmentInfoEntitys');
      // deptList.map(dept => localDb.upsertDepartmentInfoEntity(dept));
      deptModelLists = _.flatten(await localDb.upsertMultiDepartmentInfoEntity(deptList));
      console.timeEnd('insertDepartmentInfoEntitys');
      const configDb = getAccountConfigDb();
      configDb.setDepartmentLastUpdateTime(res.body.latestUpdateTime);
    }
    // 转回long型
    deptList = deptModelLists.map((dept) => {
      try {
        const deptObj = dept.toJSON();
        deptObj.deptId = Long.fromString(deptObj.deptId, true);
        deptObj.parentDeptId = Long.fromString(deptObj.parentDeptId, true);
        return deptObj;
      } catch (e) {
        console.log(e.message);
        console.log('dept', dept);
        return {};
      }
    });
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
  const userId = mainStore.getState().login.user.userId;
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

  // change num to obj
  let userStateList = res.body.userStatList;
  if (userStateList) {
    userStateList = userStateList.map((state) => {
      if (typeof state.userId !== 'object') {
        state.userId = Long.fromValue(state.userId).toUnsigned();
      }
      return state;
    });
    res.body.userStatList = userStateList;
  }


  resolve(res.body);
};
