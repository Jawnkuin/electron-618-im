const color = {
  green: '5ed7d0',
  blue: '9fa5ff',
  purple: 'ff9f3e',
  red: '7caffe',
  yellow: 'ff8576',
  peach: 'd994f1'
};

export default (text, length, fsize) => {
  if (!text) {
    return 'http://ipsumimage.appspot.com/180x180,9fa5ff?f=9fa5ff';
  }
  let charCodeLength = 0;
  for (let i = 0; i < text.length; i += 1) {
    charCodeLength += text.charCodeAt(i);
  }
  const keys = Object.keys(color);
  // eslint-disable-next-line no-unused-vars
  const colorText = color[keys[charCodeLength % keys.length]];
  let showText;
  if (length) {
    showText = text.slice(0, length);
  } else {
    showText = text;
  }
  if (fsize && typeof fsize === 'number') {
    return `http://ipsumimage.appspot.com/180x180,${colorText}?l=${showText}&f=ffffff&s=${fsize}`;
  }
  // `https://dummyimage.com/180x180/${colorText}/787878.png&text=${text}`
  return `http://ipsumimage.appspot.com/180x180,${colorText}?l=${showText}&f=ffffff`;
};
