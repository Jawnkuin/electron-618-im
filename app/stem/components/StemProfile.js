import React from 'react';
import { Button } from 'antd';
import styles from './StemProfile.less';
import dummyimage from '../../utils/dummyimage';

export default () => (
  <div className={styles.ProfileContainer}>
    <div className={styles.ImgBox}>
      <img alt="sa" src={dummyimage('建軍')} />
    </div>
    <div className={styles.DetailBox}>
      <div className={styles.NameBox}>
        吴建军
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
