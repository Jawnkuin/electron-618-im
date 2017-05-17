const color = {
  green: '5ed7d0',
  blue: '9fa5ff',
  purple: 'ff9f3e',
  red: '7caffe',
  yellow: 'ff8576',
  peach: 'd994f1'
};

const defaultGray = '909090';

export default (text, length, fsize, isGray) => {
  if (!text) {
    return 'https://placeholdit.imgix.net/~text?txtsize=120&bg=9fa5ff&txtclr=9fa5ff&txt=null&w=180&h=180&txttrack=0';
  }
  let charCodeLength = 0;
  for (let i = 0; i < text.length; i += 1) {
    charCodeLength += text.charCodeAt(i);
  }
  const keys = Object.keys(color);
  // eslint-disable-next-line no-unused-vars
  const bgColor = isGray ? defaultGray : color[keys[charCodeLength % keys.length]];
  let showText;
  if (length) {
    showText = text.slice(0, length);
  } else {
    showText = text;
  }
  if (fsize && typeof fsize === 'number') {
    return `https://placeholdit.imgix.net/~text?txtsize=${fsize}&bg=${bgColor}&txtclr=ffffff&txt=${showText}&w=180&h=180&txttrack=0`;
  }
  return `https://placeholdit.imgix.net/~text?txtsize=120&bg=${bgColor}&txtclr=ffffff&txt=${showText}&w=180&h=180&txttrack=0`;
};
