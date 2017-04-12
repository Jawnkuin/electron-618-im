import _ from 'lodash';
// state shold be
//
//
let preState = {};
const loggerState = (prevState, newState) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('pre', prevState); // eslint-disable-line no-console
    console.log('new', newState); // eslint-disable-line no-console
  }
};
// import * as Actions from '../../main/actions/login';

const onReducerInvoke = (store, handlers) => () => {
  const newState = store.getState();
  loggerState(preState, newState);
  const stateKeys = _.keys(store.getState());

  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // 初始化为空值
    if (!newState[key] || _.isEmpty(newState[key])) {
      return;
    }
    // 登录不需要变化，待改
    if (!preState[key] || !_.isEqualWith(preState[key], newState[key])) {
      if (handlers[key] && typeof handlers[key] === 'function') { handlers[key](preState[key], newState[key]); }
    }
  });

  preState = _.cloneDeep(newState);
  // await Actions.doLoginServer(action.payload.name, action.payload.psw)(mainStore.dispatch);
};

export default (initState = {}, store, handlers) => {
  preState = initState;
  store.subscribe(onReducerInvoke(store, handlers));
};