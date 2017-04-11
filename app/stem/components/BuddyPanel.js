import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './BuddyPanel.less';
import ConversationItem from './Conversation';
import Orgnaztions from './Orgnaztions';


const TabPane = Tabs.TabPane;

const conversations = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12].map(key => (
  <ConversationItem
    key={key}
  />
));


// 好友会话列表等等
export default () => (
  <div className={styles.BuddyPanel}>
    <Tabs>
      <TabPane
        tab={<Icon type="message" />}
        key="1"
      >
        {conversations}
      </TabPane>
      <TabPane tab={<Icon type="user" />} key="2" >
        <Tabs>
          <TabPane tab="组织构架" key="a1">
            <Orgnaztions />
          </TabPane>
          <TabPane tab="所属企业" key="a2" />
        </Tabs>
      </TabPane>
      <TabPane tab={<Icon type="team" />} key="3" />
    </Tabs>
  </div>
);
