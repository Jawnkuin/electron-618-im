// import windowManager from '../WindowManager';
// state shold be
//
//
const onReducerInvoke = () => (getState, windowManager) => {

};

export default (store, windowManager) => {
  store.subscribe(onReducerInvoke(store.getState, windowManager));
};
