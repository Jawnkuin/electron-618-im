import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import _ from 'lodash';
import styles from './BuddyPanel.less';
import ConversationItem from './Conversation';
import OrganizationsContainer from '../containers/OrganizationsContainer';


const TabPane = Tabs.TabPane;


// 好友会话列表等等
const BuddyPanel = ({ historySessions, allUsersInfo, openSingleTalk }) => {
  const { userListInfo } = allUsersInfo;
  const conversationItems = historySessions.map((item) => {
    const key = item.fromUserId.low ? `${item.fromUserId.high}-${item.fromUserId.low}` : item.fromUserId;
    const lastData = item.latestMsg.msgData;

    const userIndex = _.findIndex(userListInfo,
                  user => _.isEqual(user.userId, item.fromUserId)
                );
    const buddy = userListInfo[userIndex];

    const utf8Buf = Buffer.from(lastData, 'base64');
    let msgStr = '';
    try {
      msgStr = atob(utf8Buf.toString('utf8'));
    } catch (e) {
      console.warn(e.message);
      msgStr = utf8Buf.toString('utf8');
    }

    return (
      <ConversationItem
        key={key}
        name={buddy.userNickName}
        history={msgStr}
        count={item.unReadCnt}
        onlineStatus={buddy.onlineStatus}
        openSesssion={() => openSingleTalk(buddy)}
      />
    );
  });
  return (
    <div className={styles.BuddyPanel}>
      <Tabs>
        <TabPane
          tab={<Icon type="message" />}
          key="1"
        >
          {conversationItems}
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
};

BuddyPanel.propTypes = {
  allUsersInfo: PropTypes.shape({
    userListInfo: PropTypes.array
  }).isRequired,
  historySessions: PropTypes.arrayOf(PropTypes.shape({
    fromUserId: PropTypes.any,
    latestMsg: PropTypes.any.isRequired
  })).isRequired,
  openSingleTalk: PropTypes.func.isRequired
};

export default BuddyPanel;
