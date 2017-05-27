const getLocalModels = require('./models_local');
const Long = require('long');

let localDb = null;

async function getLocalDb () {
  if (!localDb) {
    const models = getLocalModels();
    await models.sequelize.sync();

    localDb = {
      /** @name 最近联系会话信息*/
      // select * from recentSessionInfo where sessionId=? limit 1
      getRecentSessionInfoByGId: function GetRecentSessionInfoByGId (sId) {
        return models.recentSessionInfo.findAll({ sessionId: sId, limit: 1 });
      },
      // select * from recentSessionInfo order by updatedTime desc limit 100
      getAllRecentSessionInfo: function GetAllRecentSessionInfo () {
        return models.recentSessionInfo.findAll({ limit: 100 });
      },
      // INSERT OR REPLACE into recentSessionInfo
      insertRecentSessionInfoEntity: function InsertRecentSessionInfoEntity (sessionInfo) {
        return models.recentSessionInfo.create(sessionInfo);
      },
      // delete from recentSessionInfo where sessionId=?
      deleteRecentSessionInfoEntity: function DeleteRecentSessionInfoEntity (sId) {
        return models.recentSessionInfo.destroy({ where: { sessionId: sId } });
      },
      // UPDATE recentSessionInfo SET sessionId = ?,sessionType = ?,updatedTime = ?,
      // lastMsgId = ?,lastMsgData = ?,latestMsgFromId=? where sessionId = ?
      updateRecentSessionInfoEntity: function UpdateRecentSessionInfoEntity (sessionInfo) {
        return models.recentSessionInfo.update({
          sessionId: sessionInfo.sessionId,
          sessionType: sessionInfo.sessionType,
          updatedTime: sessionInfo.updatedTime,
          lastMsgId: sessionInfo.lastMsgId,
          lastMsgData: sessionInfo.lastMsgData,
          latestMsgFromId: sessionInfo.latestMsgFromId
        }, {
          where: { sessionId: sessionInfo.sessionId }
        });
      },
      //  BatchInsertRecentSessionInfos: sessionInfos => models.recentSessionInfo.update(sessionInfos),

      /** @name 用户信息相关*/
      // @{
      // select * from userinfo where status<>3 limit 10000
      getAllUsersInfo: () => models.userinfo.findAll({ limit: 10000, where: { status: { $ne: 3 } } }),
      // select * from userinfo where userId=? limit 1
      getUserInfoBySId: function GetUserInfoBySId (sId) {
        return models.userinfo.findAll({ limit: 1, where: { userId: sId } });
      },
      // INSERT OR REPLACE into userinfo
      // (userId,name,nickName,avatarUrl,departmentId,departmentName,email,gender,
      // user_domain,telephone,status,reserve1) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);
      upsertUserInfoEntity: function UpsertUserInfoEntity (userObj) {
        const userInfo = Object.assign({}, userObj);
        if (typeof userInfo.userId === 'object') {
          userInfo.userId = Long.fromValue(userInfo.userId).toString();
        }
        if (typeof userInfo.departmentId === 'object') {
          userInfo.departmentId = Long.fromValue(userInfo.departmentId).toString();
        }
        return models.userinfo.upsert(userInfo);
      },
      insertMultiUserInfoEntity: (userObjList) => {
        const newObjList = [];
        userObjList.forEach((e) => {
          const userInfo = Object.assign({}, e);
          if (typeof userInfo.userId === 'object') {
            userInfo.userId = Long.fromValue(userInfo.userId).toString();
          }
          if (typeof userInfo.departmentId === 'object') {
            userInfo.departmentId = Long.fromValue(userInfo.departmentId).toString();
          }
          newObjList.push(userInfo);
        });

        return models.userinfo.bulkCreate(newObjList);
      },
      // update userinfo set name=?,nickName=?,avatarUrl=?,departmentId=?,
      // departmentName=?,email=?,gender=?,user_domain=?,telephone=?,status=?,reserve1=? where userId=?
      updateUserInfoEntity: function UpdateUserInfoEntity (userInfo) {
        return models.userinfo.update({
          userRealName: userInfo.userRealName,
          userNickName: userInfo.userNickName,
          avatarUrl: userInfo.avatarUrl,
          departmentId: userInfo.departmentId,
          departmentName: userInfo.departmentName,
          email: userInfo.email,
          userGender: userInfo.userGender,
          userDomain: userInfo.userDomain,
          userTel: userInfo.userTel,
          status: userInfo.status,
          signInfo: userInfo.signInfo,
          reserve1: userInfo.reserve1
        }, {
          where: { userId: userInfo.userId }
        });
      },
      // BatchInsertUserInfos:function (IN module::UserInfoEntityMap& mapUserInfos){},
      // @}

      /** @name 部门信息相关*/
      // @{
      // select * from departmentinfo where status=0 limit 10000
      getAllDepartmentInfo: function GetAllDepartmentInfo () {
        return models.departmentinfo.findAll({ limit: 10000, status: 0 });
      },
      // select * from departmentinfo where dId=? limit 1
      getDepartmentBySId: function GetDepartmentByDeptId (deptId) {
        return models.departmentinfo.findAll({ limit: 1, where: { deptId } });
      },
      // INSERT OR REPLACE into departmentinfo(dId,priority,name,parentDepartId,status)
      upsertDepartmentInfoEntity: function UpsetDepartmentInfoEntity (departmentObj) {
        const departmentInfo = Object.assign({}, departmentObj);
        if (typeof departmentInfo.deptId === 'object') {
          departmentInfo.deptId = Long.fromValue(departmentInfo.deptId).toString();
        }
        if (typeof departmentInfo.parentDeptId === 'object') {
          departmentInfo.parentDeptId = Long.fromValue(departmentInfo.parentDeptId).toString();
        }
        return models.departmentinfo.upsert(departmentInfo);
      },
      insertMultiDepartmentInfoEntity: (deptList) => {
        const newObjList = [];
        deptList.forEach((e) => {
          const departmentInfo = Object.assign({}, e);
          if (typeof departmentInfo.deptId === 'object') {
            departmentInfo.deptId = Long.fromValue(departmentInfo.deptId).toString();
          }
          if (typeof departmentInfo.parentDeptId === 'object') {
            departmentInfo.parentDeptId = Long.fromValue(departmentInfo.parentDeptId).toString();
          }
          newObjList.push(departmentInfo);
        });

        return models.departmentinfo.bulkCreate(newObjList);
      },
      // update departmentinfo set dId=?,priority=?
      // ,name=?,departmentId=?,parentDepartId=?,status=? where dId=?
      updateDepartmentInfoEntity: function UpdateDepartmentInfoEntity (departmentInfo) {
        return models.departmentinfo.update({
          priority: departmentInfo.priority,
          deptName: departmentInfo.deptName,
          deptId: departmentInfo.deptId,
          parentDeptId: departmentInfo.parentDeptId,
          deptStatus: departmentInfo.deptStatus
        }, {
          where: { deptId: departmentInfo.deptId }
        });
      },
      // BatchInsertDepartmentInfos:function (IN module::DepartmentMap& mapDepartmentInfos){},

      /** @name 群信息相关*/
      // select * from groupinfo where groupId=? limit 1
      getGroupInfoByGId: function GetGroupInfoByGId (gId) {
        return models.groupinfo.findAll({ limit: 1, groupId: gId });
      },
      // select * from groupinfo limit 10000
      getAllGroupInfo: function GetAllGroupInfo () {
        return models.groupinfo.findAll({ limit: 10000 });
      },
      // INSERT OR REPLACE into groupinfo
      // (groupId,name,desc,avatarUrl,creatorId,type,version,lastUpdateTime,shieldStatus,memberlist)
      insertOrReplaceGroupInfoEntity: function InsertOrReplaceGroupInfoEntity (groupInfo) {
        return models.groupinfo.create(groupInfo);
      },
      // delete from groupinfo where groupId=
      deleteGroupInfoEntity: function DeleteGroupInfoEntity (groupId) {
        return models.groupinfo.destroy({ where: { groupId } });
      },
      // update groupinfo set name=?,desc=?,avatarUrl=?,creatorId=?,type=?,version=?,
      // lastUpdateTime=?,shieldStatus=?,memberlist=? where groupId=?
      updateGroupInfoEntity: function UpdateGroupInfoEntity (groupInfo) {
        return models.groupinfo.update({
          name: groupInfo.name,
          desc: groupInfo.desc,
          avatarUrl: groupInfo.avatarUrl,
          creatorId: groupInfo.creatorId,
          type: groupInfo.type,
          version: groupInfo.version,
          lastUpdateTime: groupInfo.lastUpdateTime,
          shieldStatus: groupInfo.shieldStatus,
          memberlist: groupInfo.memberlist
        }, {
          where: { groupId: groupInfo.groupId }
        });
      },
      // BatchInsertGroupInfos:function (IN module::GroupInfoMap& mapGroupInfos){},

      /** @name 会话消息相关*/
      // @{INSERT OR IGNORE INTO immessage(msgId,sessionId,talkerid,content,
      // rendertype,sessiontype,msgtime,createtime,reserve1,reserve2,reserve3)
      insertMessage: function InsertMessage (msg) {
        return models.imimage.create(msg);
      },
      // BatchInsertMessage:function (IN std::list<MessageEntity>& msgList){},
      // select * from immessage where sessionId=? and msgId <= ? order by msgId desc limit ?
      getHistoryMessage: function GetHistoryMessage (sId, msgId, nMsgCount) {
        return models.imimage.findAll({
          where: {
            sessionId: sId,
            msgId: { $lte: msgId }
          },
          limit: nMsgCount
        });
      },

      /** @name 文件传输相关*/
      // INSERT INTO fileTransferMsg
      // (taskid, fromid,filename,reserve1,reserve2,reserve3,savepath,filesize,finishtime)
      insertFileTransferHistory: function InsertFileTransferHistory (fileInfo) {
        return models.fileTransferMsg.create(fileInfo);
      },
      // select * from fileTransferMsg order by id desc limit ?
      getFileTransferHistory: function GetFileTransferHistory (count) {
        return models.fileTransferMsg.findAll({ limit: count || 20 });
      }
    };
  }

  return localDb;
}

module.exports = getLocalDb;
