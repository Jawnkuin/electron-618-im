import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './StemProfile.less';
import dummyimage from '../../utils/dummyimage';


const StemProfile = ({ userInfo }) => (
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
        <div className={styles.LeftBox}>
          <a href="http://192.168.8.41:8080/fjbidoa"><Icon type="home" /></a>
        </div>
        <div className={styles.RightBox}>
          <Button icon="message" ghost />
        </div>
      </div>
    </div>
  </div>
  );

StemProfile.propTypes = {
  userInfo: PropTypes.shape({
    userNickName: PropTypes.string
  }).isRequired
};


export default StemProfile;
