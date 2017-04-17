export const plus = (f, l) => {
  let next = {};
  if (typeof l === 'number') {
    next.low = l;
    next.high = 0;
  } else if (typeof l === 'object') {
    if (l.high && l.low && l.unsigned) {
      next = l;
    } else {
      throw new Error('Not a uint64 data');
    }
  }
  return {
    high: f.high + next.high,
    low: f.low + next.low,
    unsigned: true
  };
};
