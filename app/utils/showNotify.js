import { screen, remote, BrowserWindow } from 'electron';
import path from 'path';

const screenSize = screen.getPrimaryDisplay().size;

// index从1开始
const getNotificationOptions = (index) => {
  const width = 250; // 250
  const height = 145; // 145
  return {
    x: screenSize.width - width - 10,
    y: screenSize.height - (index * height) - 50,
    width,
    height,
    frame: false,
    show: false,
    resizable: false,
    hasShadow: false,
    thickFrame: false,
    transparent: true,
    focusable: false
  };
};

export default (index, isRenderProcess = true) => {
  let win = null;
  const notiOptions = getNotificationOptions(index);
  // render process 与 main process 不同
  win = isRenderProcess ? new remote.BrowserWindow(notiOptions) :
    new BrowserWindow(notiOptions);
  const modalPath = `file://${path.join(process.cwd(), '/app/windows/notification.html')}`;
  win.once('ready-to-show', () => {
    win.show();
  });
  win.on('close', () => { win = null; });
  win.loadURL(modalPath);
  // win.webContents.openDevTools();
};
