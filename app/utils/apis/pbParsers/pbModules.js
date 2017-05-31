import protobuf from 'protobufjs';
import Long from 'long';
// import fs from 'fs'; // fs在解析asar文件时候会有bug,需要选择一个一个加
import { PB_PATH } from '../../../configs';

protobuf.util.Long = Long;
protobuf.configure();

const protoAddrs = [
  'IM.BaseDefine.proto',
  'IM.Buddy.proto',
  'IM.File.proto',
  'IM.Group.proto',
  'IM.Login.proto',
  'IM.Message.proto',
  'IM.Other.proto',
  'IM.Server.proto',
  'IM.SwitchService.proto'].map(pr => `${PB_PATH}${pr}`);
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
