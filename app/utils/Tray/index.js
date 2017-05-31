import path from 'path';
import { Tray, Menu, BrowserWindow } from 'electron';
import { ICON_PATH } from '../../configs';

class TrayManager {
  constructor () {
    this.tray = null;
    this.canFlash = false;
    this.defaultIconPath = '';
    this.clickHandler = () => {};
    this.defaultClickHandler = () => {};
  }

  flashTray () {
    if (!this.tray || !this.defaultIconPath) {
      throw new Error('Tray aint initialized');
    }
    this.canFlash = true;
    const f = () => {
      this.tray.setImage(this.defaultIconPath);
      if (this.canFlash) {
        setTimeout(() => {
          this.tray.setImage(path.join(ICON_PATH, 'tray_empty.png'));
        }, 450);
        setTimeout(f, 900);
      }
    };
    f();
  }

  stopFlash () {
    this.canFlash = false;
    this.clickHandler = this.defaultClickHandler;
  }

  setToolTip (text) {
    this.tray.setToolTip(text);
  }

  setClickInstantHandler (func) {
    this.clickHandler = func;
  }

  setDefaultTrayIcon (iconPath) {
    this.defaultIconPath = iconPath;
    this.tray.setImage(this.defaultIconPath);
  }

  setClickDefaultHandler (func) {
    this.defaultClickHandler = func;
    this.clickHandler = this.defaultClickHandler;
  }


  initTray (iconPath) {
    this.tray = new Tray(iconPath);
    this.defaultIconPath = iconPath;
    this.tray.setToolTip(
`v0.0.7
招标采购集团即时通
`);
    const contextMenu = Menu.buildFromTemplate([{
      label: '退出',
      click: () => {
        BrowserWindow.getAllWindows().forEach((win) => { win.close(); });
      }
    }]);

    this.tray.setContextMenu(contextMenu);

    this.tray.on('click', () => {
      this.clickHandler();
      this.clickHandler = this.defaultClickHandler;
    });
  }


}

const onlyTrayManager = new TrayManager();
export default onlyTrayManager;
