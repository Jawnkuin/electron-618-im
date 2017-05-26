const path = require('path');
const fs = require('fs');

export const STEM_PATH = `${__dirname}/stem/index.html`;
export const LOGIN_PATH = `${__dirname}/login/index.html`;
export const TALK_PATH = `${__dirname}/talk/index.html`;

// 开发路径和运行路径不同
export const PB_PATH = path.join(__dirname, './resources/pb/');

export const TCP_CHILD_PATH = path.join(__dirname, './utils/apis/tcp_client/client');

export const ICON_PATH = path.join(__dirname, './resources/icons/');

let LOCAL_DB_CONFIG = null;
let GLOBAL_DB_CONFIG = null;
let LOCAL_ACCOUNT_CONFIG = null;
let GLOBAL_CONFIG = null;


let globalDataDir;
// init global data dir
if (process.platform === 'darwin') {
  globalDataDir = `${process.env.HOME}/ZBCGJST`; // ${userIdStr}
} else {
  // globalDataDir = `${process.env.ProgramData}/ZBCGJST`; // ${userIdStr}
  globalDataDir = `${process.env.ProgramData}/ZBCGJST`;
}

if (!fs.existsSync(globalDataDir) || !fs.statSync(globalDataDir).isDirectory()) {
  fs.mkdirSync(globalDataDir);
}

GLOBAL_CONFIG = `${globalDataDir}/globalConfig.json`;

// process.env.LOCALAPPDATA
export const setLocalDataPath = (userIdStr) => {
  const localDataDir = `${globalDataDir}/${userIdStr}`;
  if (!fs.existsSync(localDataDir) || !fs.statSync(localDataDir).isDirectory()) {
    fs.mkdirSync(localDataDir);
  }
  if (!LOCAL_ACCOUNT_CONFIG) {
    LOCAL_ACCOUNT_CONFIG = `${localDataDir}/account.json`;
  }
  if (!LOCAL_DB_CONFIG) {
    LOCAL_DB_CONFIG = {
      development: {
        dialect: 'sqlite',
        storage: `${localDataDir}/${userIdStr}.db`,
        logging: false
      },
      test: {
        dialect: 'sqlite',
        storage: `${localDataDir}/${userIdStr}.db`
      },
      production: {
        dialect: 'sqlite',
        storage: `${localDataDir}/${userIdStr}.db`,
        logging: false
      }
    };
  }
};

export const getLocalDbConfig = () => {
  if (!LOCAL_DB_CONFIG) {
    throw new Error('LOCAL_DB_CONFIG not setted');
  }
  return LOCAL_DB_CONFIG;
};

export const getGlobalDbConfig = () => {
  if (!GLOBAL_DB_CONFIG) {
    GLOBAL_DB_CONFIG = {
      development: {
        dialect: 'sqlite',
        storage: `${globalDataDir}/global.db`
      },
      test: {
        dialect: 'sqlite',
        storage: `${globalDataDir}/global.db`
      },
      production: {
        dialect: 'sqlite',
        storage: `${globalDataDir}/global.db`
      }
    };
  }
  return GLOBAL_DB_CONFIG;
};

export const getLocalAccountConfig = () => {
  if (!LOCAL_ACCOUNT_CONFIG) {
    throw new Error('LOCAL_ACCOUT_CONFIG not setted');
  }

  return LOCAL_ACCOUNT_CONFIG;
};

export const getGlobalConfig = () => {
  if (!GLOBAL_CONFIG) {
    throw new Error('GLOBAL_CONFIG not setted');
  }

  return GLOBAL_CONFIG;
};
