import { createAction } from 'redux-actions';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = createAction(INCREMENT_COUNTER, amount => amount);

export const decrement = createAction(DECREMENT_COUNTER);

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    dispatch(increment(new Error('even args')));
    return;
  }

  dispatch(increment(1));
};

const incrementAsyncPromise = (delay = 1000) => new Promise(
  (resolve, reject) => {
    setTimeout(() => reject(new Error('undefined')), delay);
  }
);

export const incrementAsync = createAction(INCREMENT_COUNTER, async delay => incrementAsyncPromise(delay));
