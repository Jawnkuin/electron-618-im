import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginPanel.less';

const LoginPanel = ({ children }) => (
  <div className={styles.panel}>
    {children}
  </div>
);

LoginPanel.propTypes = {
  children: PropTypes.node.isRequired
};


export default LoginPanel;
