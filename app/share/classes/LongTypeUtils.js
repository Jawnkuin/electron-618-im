import Long from 'long';

export const mutateObjOrNumToString = (a) => {
  if (typeof a === 'object') {
    return Long.fromValue(a).toString();
  }

  if (typeof a === 'number') {
    return a.toString();
  }
};

export const fromValueToUnsigned = value => Long.fromValue(value).toUnsigned();
