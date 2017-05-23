import { windowManager } from 'electron-window-redux';
import { shell } from 'electron';
import actionsCreators from '../main/actions';
import mainStore from '../main/store';


export class WindowConfigs {
  static base = {
    show: false,
    useContentSize: true,
    frame: false // false
  }

  // 登录窗配置
  static login = Object.assign({}, WindowConfigs.base, {
    width: 430, // 默认300，dev过程中适当增加宽度来容纳chrome开发者工具
    height: 330,
    resizable: false,
    skipTaskbar: true,
    transparent: true
  })

  // 主窗体配置
  static stem = Object.assign({}, WindowConfigs.base, {
    width: 300, // 300
    height: 635,
    minWidth: 300,
    minHeight: 600,
    skipTaskbar: true,
    resizable: true
  })

  // 对话窗体配置
  static talk = Object.assign({}, WindowConfigs.base, {
    width: 620, // 620
    height: 585,
    minWidth: 620,
    minHeight: 585,
    resizable: true
  })
}

// 需要打开电脑上的浏览器
const handleRedirect = lwindow => (e, url) => {
  if (url !== lwindow.webContents.getURL()) {
    e.preventDefault();
    shell.openExternal(url);
  }
};

const Actions = actionsCreators(mainStore);
// 窗体打开
windowManager.subscribeWindowLoadedListener((newID, name) => {
  Actions.addWindow(newID, name);
  const idWindow = windowManager.get(newID);
  idWindow.webContents.on('will-navigate', handleRedirect(idWindow));
});
// 窗体关闭
windowManager.subscribeWindowCloseedListener(Actions.closeWindow);

export const mainWindowManager = windowManager;
