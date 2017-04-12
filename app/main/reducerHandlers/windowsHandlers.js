import actionsCreators from '../../main/actions';
import mainStore from '../../main/store';

// handlers用来执行state变化后需要执行的事务
const Actions = actionsCreators(mainStore);
// payload ：用户名，密码
export default (preState, newState) => {
  console.log('windowsHandlerCalled');
  // await Actions.doLoginServer(newState.name, newState.psw);
};
