const color = {
  green: '#64ea91',
  blue: '#8fc9fb',
  purple: '#d897eb',
  red: '#f69899',
  yellow: '#f8c82e',
  peach: '#f797d6',
  borderBase: '#e5e5e5',
  grass: '#d6fbb5',
  sky: '#c1e0fc'
};

export default (text) => {
  if (!text) {
    return;
  }
  const keys = Object.keys(color);
  // eslint-disable-next-line no-unused-vars
  const colorText = color[keys[parseInt(keys.length * Math.random(), 10)]].slice(1);
  // return `https://dummyimage.com/100x100/${colorText}/787878.png&text=${text}`;
  return `https://dummyimage.com/180x180/6acd9e/787878.png&text=${text}`;
};
