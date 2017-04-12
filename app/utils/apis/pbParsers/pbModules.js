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
