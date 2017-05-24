// @flow
import { app, BrowserWindow } from 'electron';
import { replayActionMain } from 'electron-window-redux';
import path from 'path';
import trayManager from './utils/Tray';
import mapStateToWindow from './utils/redux/mapStateToWindow';
import { WindowConfigs, mainWindowManager } from './utils/WindowManager';
import stateChangeHandlers from './main/reducerHandlers';
import mainStore from './main/store';
import { getGlobalConfig } from './utils/database';
import { ICON_PATH } from './configs';

import './utils/ipcMainResponces';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true }); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    const installer = require('electron-devtools-installer');
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log); // eslint-disable-line no-console
  }
};


app.on('ready', async () => {
  await installExtensions();
  // 接收render的action到reducer中，修改state
  replayActionMain(mainStore);
  // 根据修改的state更新window
  mapStateToWindow({}, mainStore, stateChangeHandlers);


  // 登录窗体
  const loginWindow = new BrowserWindow(WindowConfigs.login);
  mainWindowManager.add(loginWindow, 'login', () => {
    trayManager.initTray(path.join(ICON_PATH, 'tray_gray.png'));
      // 默认托盘点击事件为登录显示
    trayManager.setClickDefaultHandler(() => {
      if (loginWindow.isMinimized()) {
        loginWindow.restore();
      }
      if (!loginWindow.isFocused()) {
        loginWindow.focus();
      }
    });
  });


  loginWindow.loadURL(`${__dirname}/login/index.html`);
});

app.on('will-quit', () => {
  const globalConfigDb = getGlobalConfig();
  const loginUser = mainStore.login.user;
  if (!loginUser || !loginUser.userInfo) {
    return;
  }
  const loginName = loginUser.userInfo.userNickName;
  globalConfigDb.setLogoutByName(loginName);
});
