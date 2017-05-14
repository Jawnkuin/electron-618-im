import React from 'react';
import { Input } from 'antd';
import styles from './BuddyContainer.less';
import BuddyPanelContainer from '../containers/BuddyPanelContainer';

const Search = Input.Search;
// 搜索相关操作
export default () => (
  <div id="BuddyContainer">
    <div className={styles.SearchBox}>
      <Search placeholder="搜索： 员工、讨论组、群" />
    </div>
    <BuddyPanelContainer />
  </div>
);
