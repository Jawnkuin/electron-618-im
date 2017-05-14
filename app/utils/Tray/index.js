import path from 'path';
import { Tray } from 'electron';
import { ICON_PATH } from '../../configs';

class TrayManager {
  constructor () {
    this.tray = null;
    this.canFlash = false;
    this.iconPath = '';
    this.clickHandler = () => {};
  }

  flashTray () {
    if (!this.tray || !this.iconPath) {
      throw new Error('Tray aint initialized');
    }
    this.canFlash = true;
    const f = () => {
      this.tray.setImage(this.iconPath);
      if (this.canFlash) {
        setTimeout(() => {
          this.tray.setImage(path.join(ICON_PATH, 'tray_empty.png'));
        }, 300);
        setTimeout(f, 600);
      }
    };
    f();
  }

  stopFlash () {
    this.canFlash = false;
    this.clickHandler = () => {};
  }

  setToolTip (text) {
    this.tray.setToolTip(text);
  }

  setClickHandler (func) {
    this.clickHandler = func;
  }


  initTray (iconPath) {
    this.tray = new Tray(iconPath);
    this.iconPath = iconPath;

    this.tray.setToolTip(
`v0.0.5
招标采购集团即时通
`);

    this.tray.on('right-click', (e, p) => {
      console.log(e, p);
    });

    this.tray.on('click', () => {
      console.log(this.clickHandler);
      this.clickHandler();
      this.clickHandler = () => {
        console.log('empty');
      };
    });
  }


}

const onlyTrayManager = new TrayManager();
export default onlyTrayManager;
