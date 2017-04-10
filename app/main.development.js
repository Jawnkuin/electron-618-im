// @flow
import { app, BrowserWindow, Tray, Menu } from 'electron';
/*
import {
  forwardToRenderer,
  triggerAlias,
  replayActionMain
} from 'electron-redux';
*/
import path from 'path';
import { WindowManager, WindowConfigs } from './utils/WindowManager';

// 防止被内存回收w
const windowManager = new WindowManager();

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
  if (process.platform !== 'darwin') app.quit();
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

let appTray = null;

app.on('ready', async () => {
  await installExtensions();

  // 登录窗体
  // const loginWindow = new BrowserWindow(WindowConfigs.login);
  // 主窗体
  // const stemWindow = new BrowserWindow(WindowConfigs.stem);
  // windowManager.add(loginWindow, 'login');
  // windowManager.add(stemWindow, 'stem');

  const talkWindow = new BrowserWindow(WindowConfigs.talk);
  windowManager.add(talkWindow, 'talk');
  talkWindow.loadURL(`${__dirname}/talk/index.html`);

  // 托盘
  appTray = new Tray(path.join(__dirname, '../resources/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1IsVeryVeryVeryLong', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appTray.setToolTip('Tray');
  appTray.setContextMenu(contextMenu);
  appTray.displayBalloon({
    title: 'Title',
    content: 'Lorem ipsum'
  });
});
