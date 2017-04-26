import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './StemProfile.less';
import dummyimage from '../../utils/dummyimage';

class StemProfile extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      onlineStatus: PropTypes.number,
      serverTime: PropTypes.number,
      userInfo: PropTypes.object
    }).isRequired
  }

  render () {
    const { userInfo } = this.props.userInfo;
    return (
      <div className={styles.ProfileContainer}>
        <div className={styles.ImgBox}>
          <img alt={userInfo.userNickName} src={dummyimage(userInfo.userNickName, null, 50)} />
        </div>
        <div className={styles.DetailBox}>
          <div className={styles.NameBox}>
            {(userInfo && userInfo.userNickName) && userInfo.userNickName}
            <Button size="small" icon="check-circle" ghost />
          </div>
          <div className={styles.SignBox}>
            编辑个性签名
          </div>
          <div className={styles.ToolBox}>
            <Button icon="message" ghost />
          </div>
        </div>
      </div>
    );
  }
}

export default StemProfile;
