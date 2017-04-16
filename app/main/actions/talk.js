import { createAction } from 'redux-actions';
import {
  ON_LOAD_TALK
} from '../../talk/actions';


export const onLoadTalkActionCreator =
dispatch => (...args) => {
  dispatch(createAction(ON_LOAD_TALK, toBuddy => (toBuddy), () => ({ scope: 'local' }))(...args));
};
