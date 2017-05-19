/* eslint-disable */
'use strict';

var models = require('./models');
// models.recentSessionInfo.findAll().then(function(recentSessionInfos) {
// console.log(recentSessionInfos);
//  });
// 初始化所有models表
models.sequelize.sync();

var cacheInfo = {};
cacheInfo = {
  /** @name 图片存储相关*/
  // INSERT OR REPLACE INTO imimage(hashcode,localPath,urlPath)
  InsertImImageEntity: function InsertImImageEntity(entity) {
    return models.imimage.create(entity);
  },
  // select * from imimage where hashcode=? limit 1
  GetImImageEntityByHashcode: function GetImImageEntityByHashcode(hashcode) {
    return models.imimage.findAll({ where: { hashcode: hashcode }, limit: 1 });
  },
  // update imimage set localPath=? where hashcode=?
  UpdateImImageEntity: function UpdateImImageEntity(entity) {
    return models.imimage.update({ localPath: entity.localPath }, { where: { hashcode: entity.hashcode }
    });
  },

  /** @name 最近联系会话信息*/
  // select * from recentSessionInfo where sessionId=? limit 1
  GetRecentSessionInfoByGId: function GetRecentSessionInfoByGId(sId) {
    return models.recentSessionInfo.findAll({ sessionId: sId, limit: 1 });
  },
  // select * from recentSessionInfo order by updatedTime desc limit 100
  GetAllRecentSessionInfo: function GetAllRecentSessionInfo() {
    return models.recentSessionInfo.findAll({ limit: 100 });
  },
  // INSERT OR REPLACE into recentSessionInfo
  InsertRecentSessionInfoEntity: function InsertRecentSessionInfoEntity(sessionInfo) {
    return models.recentSessionInfo.create(sessionInfo);
  },
  // delete from recentSessionInfo where sessionId=?
  DeleteRecentSessionInfoEntity: function DeleteRecentSessionInfoEntity(sId) {
    return models.recentSessionInfo.destroy({ where: { sessionId: sId } });
  },
  // UPDATE recentSessionInfo SET sessionId = ?,sessionType = ?,updatedTime = ?,
  // lastMsgId = ?,lastMsgData = ?,latestMsgFromId=? where sessionId = ?
  UpdateRecentSessionInfoEntity: function UpdateRecentSessionInfoEntity(sessionInfo) {
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
  GetAllUsersInfo: function GetAllUsersInfo() {
    return models.userinfo.findAll({ limit: 10000, where: { status: { $ne: 3 } } });
  },
  // select * from userinfo where userId=? limit 1
  GetUserInfoBySId: function GetUserInfoBySId(sId) {
    return models.userinfo.findAll({ limit: 1, where: { userId: sId } });
  },
  // INSERT OR REPLACE into userinfo
  // (userId,name,nickName,avatarUrl,departmentId,departmentName,email,gender,
  // user_domain,telephone,status,reserve1) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);
  InsertUserInfoEntity: function InsertUserInfoEntity(userInfo) {
    return models.userinfo.create(userInfo);
  },
  // update userinfo set name=?,nickName=?,avatarUrl=?,departmentId=?,
  // departmentName=?,email=?,gender=?,user_domain=?,telephone=?,status=?,reserve1=? where userId=?
  UpdateUserInfoEntity: function UpdateUserInfoEntity(userInfo) {
    return models.userinfo.update({
      name: userInfo.name,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      departmentId: userInfo.departmentId,
      departmentName: userInfo.departmentName,
      email: userInfo.email,
      gender: userInfo.gender,
      user_domain: userInfo.user_domain,
      telephone: userInfo.telephone,
      status: userInfo.status,
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
  GetAllDepartmentInfo: function GetAllDepartmentInfo() {
    return models.departmentinfo.findAll({ limit: 10000, status: 0 });
  },
  // select * from departmentinfo where dId=? limit 1
  GetDepartmentBySId: function GetDepartmentBySId(sId) {
    return models.departmentinfo.findAll({ limit: 1, where: { dId: sId } });
  },
  // INSERT OR REPLACE into departmentinfo(dId,priority,name,parentDepartId,status)
  InsertDepartmentInfoEntity: function InsertDepartmentInfoEntity(departmentInfo) {
    return models.departmentinfo.create(departmentInfo);
  },
  // update departmentinfo set dId=?,priority=?
  // ,name=?,departmentId=?,parentDepartId=?,status=? where dId=?
  UpdateDepartmentInfoEntity: function UpdateDepartmentInfoEntity(departmentInfo) {
    return models.departmentinfo.update({
      priority: departmentInfo.priority,
      name: departmentInfo.name,
      departmentId: departmentInfo.departmentId,
      parentDepartId: departmentInfo.parentDepartId,
      status: departmentInfo.status
    }, {
      where: { dId: departmentInfo.dId }
    });
  },
  // BatchInsertDepartmentInfos:function (IN module::DepartmentMap& mapDepartmentInfos){},

  /** @name 群信息相关*/
  // select * from groupinfo where groupId=? limit 1
  GetGroupInfoByGId: function GetGroupInfoByGId(gId) {
    return models.groupinfo.findAll({ limit: 1, groupId: gId });
  },
  // select * from groupinfo limit 10000
  GetAllGroupInfo: function GetAllGroupInfo() {
    return models.groupinfo.findAll({ limit: 10000 });
  },
  // INSERT OR REPLACE into groupinfo
  // (groupId,name,desc,avatarUrl,creatorId,type,version,lastUpdateTime,shieldStatus,memberlist)
  InsertOrReplaceGroupInfoEntity: function InsertOrReplaceGroupInfoEntity(groupInfo) {
    return models.groupinfo.create(groupInfo);
  },
  // delete from groupinfo where groupId=
  DeleteGroupInfoEntity: function DeleteGroupInfoEntity(groupId) {
    return models.groupinfo.destroy({ where: { groupId: groupId } });
  },
  // update groupinfo set name=?,desc=?,avatarUrl=?,creatorId=?,type=?,version=?,
  // lastUpdateTime=?,shieldStatus=?,memberlist=? where groupId=?
  UpdateGroupInfoEntity: function UpdateGroupInfoEntity(groupInfo) {
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
  InsertMessage: function InsertMessage(msg) {
    return models.imimage.create(msg);
  },
  // BatchInsertMessage:function (IN std::list<MessageEntity>& msgList){},
  // select * from immessage where sessionId=? and msgId <= ? order by msgId desc limit ?
  GetHistoryMessage: function GetHistoryMessage(sId, msgId, nMsgCount) {
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
  InsertFileTransferHistory: function InsertFileTransferHistory(fileInfo) {
    return models.fileTransferMsg.create(fileInfo);
  },
  // select * from fileTransferMsg order by id desc limit ?
  GetFileTransferHistory: function GetFileTransferHistory(count) {
    return models.fileTransferMsg.findAll({ limit: count || 20 });
  }
};

//cacheInfo.InsertDepartmentInfoEntity({id:12,dId:15,priority:8,name:'asdf',parentDepartId:1,status:0});
cacheInfo.GetAllDepartmentInfo().then(function(deps){
  deps.forEach(function(dep){console.log(dep);});
  });

module.exports = cacheInfo;
