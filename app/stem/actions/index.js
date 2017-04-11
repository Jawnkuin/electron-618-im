import { createAction } from 'redux-actions';
// import doLogin from '../../utils/apis/login';

export const TALK = 'TALK';

/*
export const doLoginMain = createAction(LOGIN, async (name, psw) => {
  const resbody = await doLogin(name, psw);
  return resbody;
});
*/

export const showTalk = createAction(TALK, name => ({
  name,
  id: '001'
}),
(name, isLocal) => (
  isLocal ? { scope: 'local' } : {}
)
);
