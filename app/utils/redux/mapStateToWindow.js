import _ from 'lodash';
// state shold be
//
//
let preState = {};
const loggerState = (prevState, newState) => {
  if (false && process.env.NODE_ENV === 'development') {
    console.log('pre', prevState); // eslint-disable-line no-console
    console.log('new', newState); // eslint-disable-line no-console
    console.log(new Date(), '=============='); // eslint-disable-line no-console
  }
};
// import * as Actions from '../../main/actions/login';

const onReducerInvoke = (store, handlers) => () => {
  const newState = store.getState();
  loggerState(preState, newState);
  const stateKeys = _.keys(newState);
  // 查看每一个子状态 *值* 是否变化，若变化执行对应的handler
  _.forEach(stateKeys, (key) => {
    // if the new one and the previous one are both empty, pass
    if (
      (!newState[key] || _.isEmpty(newState[key]))
      &&
      (!preState[key] || _.isEmpty(preState[key]))
    ) {
      return;
    }

    if (!preState[key] || !_.isEqual(preState[key], newState[key])) {
      if (handlers[key] && typeof handlers[key] === 'function') {
        handlers[key](preState[key], newState[key]);
      }
    }
  });

  preState = _.cloneDeep(newState);
};

export default (initState = {}, store, handlers) => {
  preState = initState;
  store.subscribe(onReducerInvoke(store, handlers));
};
