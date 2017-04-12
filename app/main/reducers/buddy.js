import { handleActions } from 'redux-actions';

const immutableState = {
  getAllUsers: {
  },
  getDepList: {
  }
};

const buddy = handleActions({
  GET_ALL_USERS: {
    next: (state = immutableState, action) => Object.assign({}, state, {
      getAllUsers: {
        ...action.payload
      }
    })
  },
  GET_DEPT_LIST: {
    next: (state = immutableState, action) => Object.assign({}, state, {
      getDepList: {
        ...action.payload
      }
    })
  }
}, immutableState);

export default buddy;
