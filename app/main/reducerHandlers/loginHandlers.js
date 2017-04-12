import doLogin from '../../utils/apis/login';


// payload ：用户名，密码
export default (preState, newState) => {
  doLogin(newState.name, newState.psw);
};
