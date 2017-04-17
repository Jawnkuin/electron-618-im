import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import styles from './ProfilePanel.less';
import dummyImage from '../../utils/dummyimage';


const ProfilePanel = ({ buddyInfo }) => {
  const info = buddyInfo.buddyInfo;
  info.userTel = '18022222222';
  info.email = 'excdn@qq.com';
  return (
    <div className={styles.ProfilePanel}>
      <img src={dummyImage(info.userNickName)} alt="LOGO" />
      <div className={styles.profileBox}>
        <div className={styles.profileItem}>
          <Tooltip title={'六一八信息科技有限公司'}>
            <span><Icon type="home" /> {'六一八信息科技有限公司'}</span>
          </Tooltip>
        </div>
        <div className={styles.profileItem}>
          <Tooltip title={'员工'}>
            <span><Icon type="solution" /> {'员工'}</span>
          </Tooltip>
        </div>
        <div className={`${styles.profileItem} ${styles.contactItem}`}>
          <Tooltip title={info.userTel}>
            <span><Icon type="mobile" /> {info.userTel}</span>
          </Tooltip>
        </div>
        <div className={`${styles.profileItem} ${styles.contactItem}`}>
          <Tooltip title={info.email}>
            <span><Icon type="mail" /> {info.email}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

/*
<div className={styles.profileItem}>
  <Tooltip title={data.phone}>
    <span><Icon type="phone" /> {data.phone}</span>
  </Tooltip>
</div>
*/

ProfilePanel.propTypes = {
  buddyInfo: PropTypes.shape({
    buddyInfo: PropTypes.shape({
      userId: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default ProfilePanel;
