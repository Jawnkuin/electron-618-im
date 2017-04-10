import React from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './ProfilePanel.less';
import dummyImage from '../../utils/dummyimage';


const data = {
  company: '福建省经纬测绘',
  name: '李四',
  role: '员工',
  phone: '[空]',
  tel: '18888888888',
  email: '123435@exd.es'
};

const ProfilePanel = () => (
  <div className={styles.ProfilePanel}>
    <img src={dummyImage(data.name)} alt="LOGO" />
    <div className={styles.profileBox}>
      <div className={styles.profileItem}>
        <Tooltip title={data.company}>
          <span><Icon type="home" /> {data.company}</span>
        </Tooltip>
      </div>
      <div className={styles.profileItem}>
        <Tooltip title={data.role}>
          <span><Icon type="solution" /> {data.role}</span>
        </Tooltip>
      </div>
      <div className={styles.profileItem}>
        <Tooltip title={data.phone}>
          <span><Icon type="phone" /> {data.phone}</span>
        </Tooltip>
      </div>
      <div className={`${styles.profileItem} ${styles.contactItem}`}>
        <Tooltip title={data.tel}>
          <span><Icon type="mobile" /> {data.tel}</span>
        </Tooltip>
      </div>
      <div className={`${styles.profileItem} ${styles.contactItem}`}>
        <Tooltip title={data.email}>
          <span><Icon type="mail" /> {data.email}</span>
        </Tooltip>
      </div>
    </div>
  </div>
);

export default ProfilePanel;
