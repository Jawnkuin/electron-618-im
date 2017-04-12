import loginHandlers from './loginHandlers';
import windowsHandlers from './windowsHandlers';
import buddyHandlers from './buddyHandlers';

// 每个handler会传入对应的preState和newState
// loginHandlers(loginPreState, loginNewState)
export default {
  login: loginHandlers
  // windows: windowsHandlers,
  // buddy: buddyHandlers
};
