// @flow
import { app, BrowserWindow } from 'electron'; // , Tray, Menu
import { replayActionMain } from 'electron-redux';
import mapStateToWindow from './utils/redux/mapStateToWindow';
import { windowManager, WindowConfigs } from './utils/WindowManager';
import stateChangeHandlers from './main/reducerHandlers';
import mainStore from './main/store';
import tcpClient from './utils/apis/tcp_client';
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
    try {
      if (tcpClient.client && !tcpClient.client.destroyed) {
        tcpClient.client.destroy();
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }

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

// const appTray = null;

app.on('ready', async () => {
  await installExtensions();
  // 接收render的action到reducer中，修改state
  replayActionMain(mainStore);
  // 根据修改的state更新window
  mapStateToWindow({}, mainStore, stateChangeHandlers);

  // 登录窗体
  const loginWindow = new BrowserWindow(WindowConfigs.login);
  // 主窗体
  // const stemWindow = new BrowserWindow(WindowConfigs.stem);
  windowManager.add(loginWindow, 'login');
  // windowManager.add(stemWindow, 'stem');

  // 会话窗体
  // const talkWindow = new BrowserWindow(WindowConfigs.talk);
  // windowManager.add(talkWindow, 'talk');

  loginWindow.loadURL(`${__dirname}/login/index.html`);


  /* 托盘
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
  */
});
