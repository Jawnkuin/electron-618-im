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
  const stemWindow = new BrowserWindow(WindowConfigs.stem);
  // windowManager.add(loginWindow, 'login');
  windowManager.add(stemWindow, 'stem');

  stemWindow.loadURL(`${__dirname}/stem/index.html`);

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

/*
"electron-redux": "^1.2.5",
"protobufjs": "^6.6.5",
"lodash": "^4.17.4",
"electron": "^1.4.15",
"electron-debug": "^1.1.0",
"extract-text-webpack-plugin": "^2.0.0",
"font-awesome": "^4.7.0",
"react": "^15.4.2",
"react-dom": "^15.4.2",
"redux-actions": "^2.0.1",
"react-hot-loader": "3.0.0-beta.6",
"react-redux": "^5.0.2",
"react-router": "^3.0.2",
"react-router-redux": "^4.0.7",
"redux": "^3.6.0",
"redux-thunk": "^2.2.0",
"source-map-support": "^0.4.10",
"redux-promise": "^0.5.3"
*/
