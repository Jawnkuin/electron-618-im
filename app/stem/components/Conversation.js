import React from 'react';
import { Badge } from 'antd';
import styles from './Conversation.less';
import dummyImage from '../../utils/dummyimage';
// 主面板列表项
export default () => (
  <div
    className={styles.ConversationItem}
    onDoubleClick={() => {
      console.log('dbclick');
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
