import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import _ from 'lodash';
import styles from './BuddyPanel.less';
import ConversationItem from './Conversation';
import OrganizationsContainer from '../containers/OrganizationsContainer';


const TabPane = Tabs.TabPane;


// 好友会话列表等等
const BuddyPanel = ({ historySessions, allUsersInfo, openSingleTalk }) => (
  <div className={styles.BuddyPanel}>
    <Tabs>
      <TabPane
        tab={<Icon type="message" />}
        key="1"
      >
        {
          historySessions.map((item) => {
            const key = item.fromUserId.low ? `${item.fromUserId.high}-${item.fromUserId.low}` : item.fromUserId;
            const count = item.msgList.length;
            const lastData = item.msgList[count - 1].msgData;

            const userIndex = _.findIndex(allUsersInfo.userListInfo.userList,
            user => _.isEqual(user.userId, item.fromUserId));
            const buddy = allUsersInfo.userListInfo.userList[userIndex];

            const utf8Buf = Buffer.from(lastData, 'base64');
            const msgStr = utf8Buf.toString('utf8');
            return (
              <ConversationItem
                key={key}
                name={buddy.userNickName}
                history={msgStr}
                count={item.unReadCnt}
                openSesssion={() => openSingleTalk(buddy)}
              />
            );
          })
        }
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

BuddyPanel.propTypes = {
  allUsersInfo: PropTypes.shape({
    userListInfo: PropTypes.object
  }).isRequired,
  historySessions: PropTypes.arrayOf(PropTypes.shape({
    fromUserId: PropTypes.any,
    msgList: PropTypes.array.isRequired
  })).isRequired,
  openSingleTalk: PropTypes.func.isRequired
};

export default BuddyPanel;
