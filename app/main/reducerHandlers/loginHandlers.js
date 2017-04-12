import * as Actions from '../../main/actions/login';
// handlers用来执行state变化后需要执行的事务

// 获得用户名，密码
export const onGetUserPayload = async (payload, dispatch, getState) => {
  await Actions.doLoginServer(payload.name, payload.psw)(dispatch, getState);
};

export const onWindowLoaded = () => {};
