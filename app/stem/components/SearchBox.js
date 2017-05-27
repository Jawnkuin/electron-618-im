import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Long from 'long';
import FeedBackItem from './FeedBackItem';
import styles from './SearchBox.less';

// 搜索最大返回数量，太多会覆盖整个窗口
const MAX_FEED_BACK_COUNT = 8;

// 搜索相关操作

class SearchBox extends Component {

  static propTypes = {
    allUsersInfo: PropTypes.shape({
      deptListInfo: PropTypes.array.isRequired,
      userListInfo: PropTypes.array.isRequired
    }).isRequired,
    openSingleTalk: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      searchStr: '',
      feedback: []
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }

  emitEmpty = () => {
    this.setState({ searchStr: '', feedback: [] });
  }

  onChangeSearchStr = (e) => {
    const newStr = e.target.value;

    let searchResults = [];
    if (newStr) {
      const { userListInfo } = this.props.allUsersInfo;

      const searchPattern = new RegExp(newStr, 'yiu');// gi;
      let currentTakeNum = 0;
      searchResults = _.filter(userListInfo,
        (u) => {
          if (currentTakeNum < MAX_FEED_BACK_COUNT) {
            const isMatching = searchPattern.test(u.userRealName) || searchPattern.test(u.userNickName);
            currentTakeNum = isMatching ? (currentTakeNum + 1) : currentTakeNum;
            return isMatching;
          }
          return false;
        }
      );
      if (searchResults.length > 0) {
        searchResults = _.uniqWith(searchResults, (a, b) => _.isEqual(a.userId, b.userId));
      }
    }


    this.setState({ searchStr: newStr, feedback: searchResults });
  }


  render () {
    const { searchStr, feedback } = this.state;
    const suffix = searchStr ? <Icon type="close-circle" onClick={this.emitEmpty} /> : <Icon type="search" />;
    return (
      <div className={styles.SearchBox}>
        <Input
          placeholder="搜索： 员工、讨论组、群"
          suffix={suffix}
          onChange={this.onChangeSearchStr}
          value={searchStr}
        />
        <div className={styles.SearchFeedback}>
          {
            feedback.map(e =>
              (<FeedBackItem
                key={Long.fromValue(e.userId).toString(16)}
                user={e}
                selectHandler={this.props.openSingleTalk}
              />)
            )
          }
        </div>
      </div>
    );
  }
}


export default SearchBox;
