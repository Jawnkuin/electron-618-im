// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import showNotify from '../utils/showNotify';
import doLogin from '../utils/apis/login';

import styles from './Home.less';

const resolve = (data) => {
  console.log(data);
};

const reject = (data) => {
  console.log(data);
};

export default class Home extends Component {
  render () {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <a
            onClick={() => { showNotify(1); }}
          >
            open notifier
          </a>
          <a
            onClick={() => { doLogin(resolve, reject); }}
          >
            Login
          </a>
        </div>
      </div>
    );
  }
}
