import React from 'react';
import DlgItem from './DlgItem';
import InputPanel from './InputPanel';

import styles from './DialogPanel.less';

const time0 = new Date().getTime();

const dlgs = [
  {
    time: time0,
    user: {
      name: '李四'
    },
    msg: '短消息'
  },
  {
    time: time0 + 1000,
    user: {
      name: '吴建军'
    },
    msg: '谁能想到一个消息竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然这么长！'
  },
  {
    time: time0 + 2000,
    user: {
      name: '吴建军'
    },
    msg: '短消息'
  },
  {
    time: time0 + 3000,
    user: {
      name: '吴建军'
    },
    msg: '谁能想到一个消息竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然这么长！'
  },
  {
    time: time0 + 4000,
    user: {
      name: '吴建军'
    },
    msg: '短消息'
  },
  {
    time: time0 + 5000,
    user: {
      name: '吴建军'
    },
    msg: '谁能想到一个消息竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然竟然这么长！'
  },
  {
    time: time0 + 6000,
    user: {
      name: '吴建军'
    },
    msg: '短消息'
  }
];

const DialogPanel = () => (
  <div className={styles.DialogPanel}>
    <div className={styles.DlgListView} >
      {
        dlgs.map(dlg => (
          <DlgItem
            key={dlg.user.name + dlg.time}
            user={dlg.user}
            time={dlg.time}
            msg={dlg.msg}
            isLeft={dlg.user.name === '李四'}
          />
        ))
      }
    </div>
    <div className={styles.DlgInputView}>
      <InputPanel />
    </div>
  </div>
);

export default DialogPanel;
