import React from 'react';
import PropTypes from 'prop-types';
import styles from './DlgItem.less';
import dummyImage from '../../utils/dummyimage';

// 消息靠左或者靠右停靠
const customPaddingStyle = (isLeft = true) => ({
  DlgItem: {
    flexDirection: isLeft ? 'row' : 'row-reverse'
  },
  DlgDetail: {
    alignItems: isLeft ? 'flex-start' : 'flex-end'
  }
});

const DlgItem = ({ time, user, msg, isLeft }) => (
  <div className={styles.DlgItem} style={customPaddingStyle(isLeft).DlgItem}>
    <img src={dummyImage(user.name)} alt={user.name} />
    <div className={styles.DlgDetail} style={customPaddingStyle(isLeft).DlgDetail}>
      <div className={styles.nameBox}>
        {`${user.name} ${new Date(time)}`}
      </div>
      <div className={styles.msgBox}>
        <div className={styles.msgBubble}>{msg}</div>
      </div>
    </div>
  </div>
);


DlgItem.propTypes = {
  time: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  msg: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired
};

export default DlgItem;
