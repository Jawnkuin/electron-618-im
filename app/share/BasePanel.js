import React, { Component } from 'react';
import type { Children } from 'react';
import styles from './BasePanel.less';

class BasePanel extends Component {
  props: {
    children: Children
  };

  render () {
    return (
      <div className={styles.panel}>
        {this.props.children}
      </div>
    );
  }
}

export default BasePanel;
