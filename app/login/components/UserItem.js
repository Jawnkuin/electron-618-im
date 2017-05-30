import React from 'react';
import PropTypes from 'prop-types';
import dummyImage from '../../utils/dummyimage';
import styles from './UserItem.less';

const UserItem = ({ user, selectHandler }) => (
  <div
    className={styles.UserItem}
    onClick={() => { selectHandler(user); }}
  >
    <img
      src={dummyImage(user.nickName, 1, undefined, user.onlineStatus === 2)}
      alt={user.nickName}
    />
    <div className={styles.NameBox}>
      {user.nickName}
      <span>[{user.name}]</span>
    </div>
  </div>
);

UserItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  selectHandler: PropTypes.func.isRequired
};

export default UserItem;
