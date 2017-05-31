// @flow
import { app, BrowserWindow } from 'electron';
import { replayActionMain } from 'electron-window-redux';
import path from 'path';
import trayManager from './utils/Tray';
import mapStateToWindow from './utils/redux/mapStateToWindow';
import getActionCreators from './main/actions';
import { WindowConfigs, mainWindowManager } from './utils/WindowManager';
import stateChangeHandlers from './main/reducerHandlers';
import mainStore from './main/store';
import { getGlobalConfigDb } from './utils/database';
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


app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    const globalConfigDb = getGlobalConfigDb();
    const loginState = mainStore.getState().login;
    if (!loginState || !loginState.user || !loginState.user.userRealName) {
      app.quit();
    } else {
      const loginName = loginState.user.userRealName;
      await globalConfigDb.setLogoutByName(loginName);
      console.log('setLogoutByName', loginName);
      app.quit();
    }
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
    const globalConfigDb = getGlobalConfigDb();
    const allUsers = globalConfigDb.getAllUsers();
    const Actions = getActionCreators();
    Actions.loginHistoryLoadSuccess(allUsers);
  });


  loginWindow.loadURL(`${__dirname}/login/index.html`);
});

app.on('quit', () => {

});
