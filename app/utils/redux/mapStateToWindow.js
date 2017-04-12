// import windowManager from '../WindowManager';
// state shold be
//
//

import * as Actions from '../../main/actions/login';

const onReducerInvoke = (preState, store, windowManager) => async () => {
  await Actions.doLoginServer(action.payload.name, action.payload.psw)(mainStore.dispatch);
};

export default (initState = {}, store, windowManager) => {
  store.subscribe(onReducerInvoke(initState, store, windowManager));
};
