import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import styles from './Conversation.less';
import dummyImage from '../../utils/dummyimage';
// 主面板列表项
const Conversation = ({ name, history, count = 0 }) => (
  <div
    className={styles.ConversationItem}
    onDoubleClick={() => {
      console.log('dbclick');
    }}
  >
    <img src={dummyImage(name, 0, 75)} alt={name} />
    <div className={styles.ConversationDetail}>
      <div className={styles.NameBox}>{name}</div>
      <div className={styles.HistoryBox}>{history}</div>
    </div>
    <div className={styles.Badge}><Badge count={count} /></div>
  </div>
);

Conversation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default Conversation;
