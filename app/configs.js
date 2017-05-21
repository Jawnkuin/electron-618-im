const path = require('path');

export const STEM_PATH = `${__dirname}/stem/index.html`;
export const LOGIN_PATH = `${__dirname}/login/index.html`;
export const TALK_PATH = `${__dirname}/talk/index.html`;

// 开发路径和运行路径不同
export const PB_PATH = path.join(__dirname, './resources/pb/');

export const TCP_CHILD_PATH = path.join(__dirname, './utils/apis/tcp_client/client');


export const ICON_PATH = path.join(__dirname, './resources/icons/');

let LOCAL_DB_CONFIG = null;
// process.env.LOCALAPPDATA
export const setLocalDbPath = (userIdStr) => {
  LOCAL_DB_CONFIG = {
    development: {
      dialect: 'sqlite',
      storage: `userdata/${userIdStr}/${userIdStr}.db`
    },
    test: {
      dialect: 'sqlite',
      storage: `userdata/${userIdStr}/${userIdStr}.db`
    },
    production: {
      dialect: 'sqlite',
      storage: `userdata/${userIdStr}/${userIdStr}.db`
    }
  };
};

export const getLocalDbConfig = () => {
  if (!LOCAL_DB_CONFIG) {
    throw new Error('LOCAL_DB_CONFIG not setted');
  }
  return LOCAL_DB_CONFIG;
};
