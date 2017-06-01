import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon, Tooltip } from 'antd';
import _ from 'lodash';
import styles from './BuddyPanel.less';
import Conversation from './Conversation';
import OrganizationsContainer from '../containers/OrganizationsContainer';


const TabPane = Tabs.TabPane;


const getConversations = (userListInfo, historySessions, openSingleTalk) => {
  const sessionItems = historySessions.map((item) => {
    const key = item.fromUserId.low ? `${item.fromUserId.high}-${item.fromUserId.low}` : item.fromUserId;


    const userIndex = _.findIndex(userListInfo, user => _.isEqual(user.userId, item.fromUserId));
    const buddy = userListInfo[userIndex];


    const lastData = item.latestMsg.msgData;


    const utf8Buf = Buffer.from(lastData, 'base64');
    // console.log(utf8Buf.toString('base64').toString('base64'));
    let msgStr = '';
    try {
      msgStr = utf8Buf.toString('utf8');
    } catch (e) {
      console.warn(e.message);
      msgStr = '';
    }

    return {
      key,
      name: buddy.userNickName,
      history: msgStr,
      count: item.unReadCnt,
      onlineStatus: buddy.onlineStatus,
      openSesssion: () => { openSingleTalk(buddy); }
    };
  });


  return sessionItems.map(s =>
    <Conversation {...s} />
  );
};

class BuddyPanel extends Component {
  static propTypes = {
    allUsersInfo: PropTypes.shape({
      userListInfo: PropTypes.array
    }).isRequired,
    historySessions: PropTypes.arrayOf(PropTypes.shape({
      fromUserId: PropTypes.any,
      latestMsg: PropTypes.any.isRequired
    })).isRequired,
    openSingleTalk: PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps) {
    const { allUsersInfo } = nextProps;
    const { userListInfo } = allUsersInfo;
    if (!userListInfo || userListInfo.length === 0) {
      return false;
    }
    return true;
  }
  /*
  componentDidUpdate () {
    const { allUsersInfo } = this.props;
    const { userListInfo } = allUsersInfo;
    // 已经接收到用户列表再做最新会话请求
    if (userListInfo && userListInfo.length > 0) {
      return (<div>loading</div>);
    }
  }
  */

  render () {
    const { historySessions, allUsersInfo, openSingleTalk } = this.props;
    const { userListInfo } = allUsersInfo;
    if (!userListInfo || userListInfo.length === 0) {
      return (
        <div className={styles.Loading}>
          <Icon type="loading" />
          <div>加载中...</div>
        </div>
      );
    }
    const conversationItems = getConversations(userListInfo, historySessions, openSingleTalk);
    return (
      <div className={styles.BuddyPanel}>
        <Tabs>
          <TabPane
            tab={
              <Tooltip title={'会话'}>
                <Icon type="message" />
              </Tooltip>
            }
            key="1"
          >
            {conversationItems}
          </TabPane>
          <TabPane
            tab={
              <Tooltip title={'联系人'}>
                <Icon type="user" />
              </Tooltip>
            }
            key="2"
          >
            <Tabs>
              <TabPane tab="组织构架" key="a1">
                <OrganizationsContainer />
              </TabPane>
              <TabPane tab="所属企业" key="a2" />
            </Tabs>
          </TabPane>
          <TabPane
            tab={
              <Tooltip title={'群组'}>
                <Icon type="team" />
              </Tooltip>
            }
            key="3"
          />
        </Tabs>
      </div>
    );
  }
}


export default BuddyPanel;
