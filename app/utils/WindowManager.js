import { windowManager } from 'electron-window-redux';
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
    width: 300, // 默认300，dev过程中适当增加宽度来容纳chrome开发者工具
    height: 565,
    resizable: false,
    transparent: true
  })

  // 主窗体配置
  static stem = Object.assign({}, WindowConfigs.base, {
    width: 300, // 300
    height: 635,
    minWidth: 300,
    minHeight: 600,
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


const Actions = actionsCreators(mainStore);
windowManager.subscribeWindowLoadedListener(Actions.addWindow);
windowManager.subscribeWindowCloseedListener(Actions.closeWindow);

export const mainWindowManager = windowManager;
