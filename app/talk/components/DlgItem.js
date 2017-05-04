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
  },
  msgBubble: {
    backgroundColor: isLeft ? '#e8ecef' : '#78cdf8'
  }
});

const formatNum = num => num.toLocaleString('cn', { minimumIntegerDigits: 2 });

const dateFormat = (time) => {
  const date = new Date(time * 1000);
  return `${formatNum(date.getHours())}:${formatNum(date.getMinutes())}:${formatNum(date.getSeconds())}`;
};

const DlgItem = ({ time, name, msg, isLeft }) => (
  <div className={styles.DlgItem} style={customPaddingStyle(isLeft).DlgItem}>
    <img src={dummyImage(name, 1)} alt={name} />
    <div className={styles.DlgDetail} style={customPaddingStyle(isLeft).DlgDetail}>
      <div className={styles.nameBox}>
        {`${name} ${dateFormat(time)}`}
      </div>
      <div className={styles.msgBox}>
        <div className={styles.msgBubble} style={customPaddingStyle(isLeft).msgBubble}>{msg}</div>
      </div>
    </div>
  </div>
  );


DlgItem.propTypes = {
  time: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired
};

export default DlgItem;
