export const PUSH_NOTIFIERS = 'PUSH_NOTIFIERS';
export const POP_NOTIFIER = 'POP_NOTIFIER';

// 展示一个提示框
function displayANotify () {

}

// 添加单个提示框
export function addANotify (noti) {
  return {
    notis: [noti],
    type: PUSH_NOTIFIERS
  };
}

// 已经弹出的剔除队列
export function popANotify () {
  return {
    type: POP_NOTIFIER
  };
}
