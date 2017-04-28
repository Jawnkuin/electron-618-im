import React from 'react';
import { Tabs, Icon } from 'antd';
import styles from './BuddyPanel.less';
import ConversationItem from './Conversation';
import OrganizationsContainer from '../containers/OrganizationsContainer';


const TabPane = Tabs.TabPane;

const conversations = [
  { key: 1, name: '李四', history: '[表情]', count: 1 },
  { key: 2, name: '林巍', history: '好的', count: 0 }
].map(item => (
  <ConversationItem
    key={item.key}
    name={item.name}
    history={item.history}
    count={item.count}
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
            <OrganizationsContainer />
          </TabPane>
          <TabPane tab="所属企业" key="a2" />
        </Tabs>
      </TabPane>
      <TabPane tab={<Icon type="team" />} key="3" />
    </Tabs>
  </div>
);
