import { fromValueToUnsigned } from '../../../share/classes/LongTypeUtils';
import { getLocalDb } from '../../database';
import getActionCreators from '../../../main/actions';


export default async (sessionId, endId, count) => {
  try {
    const localDb = await getLocalDb();
    localDb.getHistoryMessage(sessionId, endId, count).then(
      (historyMsgModels) => {
        let historyMsgs = [];
        if (historyMsgModels.length > 0) {
          // 从数据库Model转为Object，将部分string改为Long
          historyMsgs = historyMsgModels.map((md) => {
            const msgObj = md.toJSON();
            msgObj.msgId = fromValueToUnsigned(msgObj.msgId);
            msgObj.toSessionId = fromValueToUnsigned(msgObj.toSessionId);
            msgObj.fromUserId = fromValueToUnsigned(msgObj.fromUserId);

            return msgObj;
          });
        }
        const actionsCreators = getActionCreators();
        actionsCreators.onGetHistoryMsgs(historyMsgs, sessionId);
      },
      (e) => {
        throw e;
      }
    );
  } catch (e) {
    console.log(e);
  }
};
