import { loginUserMapper, attemptMapper } from './loginHandlers';
import { toBuddysMapper } from './stemHandlers';
import { unReadInfosMapper } from './talkHandlers';


export default () => {
  const allMappers = [loginUserMapper, attemptMapper, toBuddysMapper, unReadInfosMapper];
  return allMappers;
};
