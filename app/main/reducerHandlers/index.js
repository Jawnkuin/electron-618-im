import loginHandlers from './loginHandlers';
// import windowsHandlers from './windowsHandlers';
import stemHandlers from './stemHandlers';
import talkHandlers from './talkHandlers';

// 每个handler会传入对应的preState和newState
// loginHandlers(loginPreState, loginNewState)
export default {
  login: loginHandlers,
  stem: stemHandlers,
  talk: talkHandlers
};
