import { handleActions } from 'redux-actions';

const immutableState = {
  onLoadUser: {

  },
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

export const stemKeys = {
  getAllUsers: 'getAllUsers',
  getDepList: 'getDepList'
};

export default buddy;
