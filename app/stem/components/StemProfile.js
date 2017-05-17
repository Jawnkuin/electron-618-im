import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './StemProfile.less';
import dummyimage from '../../utils/dummyimage';


const StemProfile = ({ userInfo }) => {
  const uInfo = userInfo.userInfo;
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.ImgBox}>
        <img alt={uInfo.userNickName} src={dummyimage(uInfo.userNickName, null, 50)} />
      </div>
      <div className={styles.DetailBox}>
        <div className={styles.NameBox}>
          {(uInfo && uInfo.userNickName) && uInfo.userNickName}
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
};

StemProfile.propTypes = {
  userInfo: PropTypes.shape({
    onlineStatus: PropTypes.number,
    serverTime: PropTypes.number,
    userInfo: PropTypes.object
  }).isRequired
};


export default StemProfile;
