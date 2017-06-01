import { getLocalDb } from '../../database';

export default async (sessionId, endId, count) => {
  const localDb = await getLocalDb();
  const historyMsgModels = await localDb.getHistoryMessage(sessionId, endId, count);
  let historyMsgs = [];
  if (typeof historyMsgModels === 'array') {
    historyMsgs = historyMsgModels.map(md => md.toJSON());
  }
};
