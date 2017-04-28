import { createAction } from 'redux-actions';
import {
  ON_LOAD_TALK,
  RECIEVE_MESSAGE
} from '../../talk/actions';


export const onLoadTalkActionCreator =
dispatch => (...args) => {
  dispatch(createAction(ON_LOAD_TALK, toBuddy => (toBuddy), () => ({ scope: 'talk' }))(...args));
};

export const onReceiveMessageActionCreator =
dispatch => (...args) => {
  dispatch(createAction(RECIEVE_MESSAGE, msg => msg, () => ({ scope: 'talk' }))(...args));
};
