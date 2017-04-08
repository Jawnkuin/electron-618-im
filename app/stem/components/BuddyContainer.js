import React from 'react';
import { Input } from 'antd';
import styles from './BuddyContainer.less';
import BuddyPanel from './BuddyPanel';

// 搜索相关操作
export default () => (
  <div id="BuddyContainer">
    <div className={styles.SearchBox}>
      <Input.Search placeholder="搜索： 员工、讨论组、群" />
    </div>
    <BuddyPanel />
  </div>
);
