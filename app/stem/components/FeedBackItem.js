import React from 'react';
import PropTypes from 'prop-types';
import dummyImage from '../../utils/dummyimage';
import styles from './FeedBackItem.less';

const FeedBackItem = ({ user, selectHandler }) => (
  <div
    className={styles.FeedBackItem}
    onClick={() => { selectHandler(user); }}
  >
    <img
      src={dummyImage(user.userNickName, 1, undefined, user.onlineStatus === 2)}
      alt={user.userNickName}
    />
    <div className={styles.NameBox}>
      {user.userNickName}
      <span>[{user.userRealName}]</span>
    </div>
  </div>
);

FeedBackItem.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.any.isRequired
  }).isRequired,
  selectHandler: PropTypes.func.isRequired
};

export default FeedBackItem;
