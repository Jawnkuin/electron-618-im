import React from 'react';
import { Badge } from 'antd';
import { ipcRenderer } from 'electron';
import styles from './Conversation.less';
import dummyImage from '../../utils/dummyimage';
import { showTalk } from '../actions';
// 主面板列表项
export default () => (
  <div
    className={styles.ConversationItem}
    onClick={() => {
      console.log('click');
      ipcRenderer.send('redux-action', showTalk('吴建军'));
    }}
  >
    <img src={dummyImage('李四')} alt={'李四'} />
    <div className={styles.ConversationDetail}>
      <div className={styles.NameBox}>{'李四'}</div>
      <div className={styles.HistoryBox}>{'好的'}</div>
    </div>
    <div className={styles.Badge}><Badge count={2} /></div>
  </div>
);
