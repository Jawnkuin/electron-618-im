import { createAction } from 'redux-actions';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = createAction(INCREMENT_COUNTER);

export const decrement = createAction(DECREMENT_COUNTER);

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    dispatch(increment(new Error('even args')));
  }

  dispatch(increment());
};

export const incrementAsync = (delay = 1000) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};
