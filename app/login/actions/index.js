import { createAction } from 'redux-actions';
// import doLogin from '../../utils/apis/login';

export const LOGIN = 'LOGIN';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

export const doLogin = createAction(LOGIN, name => ({
  name,
  id: '001'
}),
(name, isLocal) => (
  isLocal ? { scope: 'local' } : {}
)
);
