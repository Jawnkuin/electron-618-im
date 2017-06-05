import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { getHistoryMessages } from '../apis';
import styles from './ViewMore.less';

const ViewMore = ({ sessionId, endId, hasHistory }) => (
  <div
    className={styles.ViewMore}
    onClick={() => {
      if (!hasHistory) {
        return;
      }

      getHistoryMessages(sessionId, endId, 10);
    }}
  >
    {
      hasHistory ? (
        <span>
          <Icon type="clock-circle" />
          查看更多
        </span>
      ) : (
        <span>
          <Icon type="exclamation-circle" />
          没有更多消息
        </span>
      )
    }


  </div>
);

ViewMore.propTypes = {
  sessionId: PropTypes.shape({
    high: PropTypes.number,
    low: PropTypes.number
  }).isRequired,
  endId: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number,
      low: PropTypes.number
    }),
    PropTypes.number
  ]).isRequired,
  hasHistory: PropTypes.bool.isRequired
};

export default ViewMore;
