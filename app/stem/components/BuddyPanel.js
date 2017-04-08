import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './BuddyPanel.less';

const TabPane = Tabs.TabPane;
// 好友会话列表等等
export default () => (
  <div className={styles.BuddyPanel}>
    <Tabs>
      <TabPane tab={<Icon type="message" />} key="1">Content of Tab 1</TabPane>
      <TabPane tab={<Icon type="user" />} key="2">Content of Tab 2</TabPane>
      <TabPane tab={<Icon type="team" />} key="3">Content of Tab 3</TabPane>
    </Tabs>
  </div>
);
