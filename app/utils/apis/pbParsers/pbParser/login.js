import { onLoginResponce } from '../../login';
import getActionCreators from '../../../../main/actions';
import { IMBaseDefine, IMLogin } from '../pbModules';


// 登录模块响应解析
export default (pbHeader, pbBodyBuffer) => {
  const Actions = getActionCreators();
  try {
    const IMLoginCmdIDs = IMBaseDefine.LoginCmdID;
    switch (pbHeader.commandId) {
      case IMLoginCmdIDs.CID_LOGIN_RES_USERLOGIN:
        onLoginResponce({
          header: pbHeader,
          body: IMLogin.IMLoginRes.decode(pbBodyBuffer)
        })(Actions.loginSuccess, Actions.loginFail);
        break;

      case IMLoginCmdIDs.CID_LOGIN_RES_LOGINOUT:
        return IMLogin.IMLogoutRsp.decode(pbBodyBuffer);

      case IMLoginCmdIDs.CID_LOGIN_KICK_USER:
        return IMLogin.IMKickUser.decode(pbBodyBuffer);

      case IMLoginCmdIDs.CID_LOGIN_REQ_DEVICETOKEN:
        console.log('IMDeviceTokenReq', IMLogin.IMDeviceTokenReq.decode(pbBodyBuffer));
        break;

      case IMLoginCmdIDs.CID_LOGIN_RES_DEVICETOKEN:
        return IMLogin.IMDeviceTokenRsp.decode(pbBodyBuffer);

      case IMLoginCmdIDs.CID_LOGIN_RES_KICKPCCLIENT:
        return IMLogin.IMKickPCClientRsp.decode(pbBodyBuffer);

      case IMLoginCmdIDs.CID_LOGIN_RES_PUSH_SHIELD:
        return IMLogin.IMPushShieldRsp.decode(pbBodyBuffer);

      case IMLoginCmdIDs.CID_LOGIN_RES_QUERY_PUSH_SHIELD:
        return IMLogin.IMQueryPushShieldRsp.decode(pbBodyBuffer);

      default:

        throw new Error(`Error parse Login res ${pbHeader.commandId}`);
    }
  } catch (e) {
    throw (new Error(`loginParser ${e.message}`));
  }
};
