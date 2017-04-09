import React from 'react';
import { Tree } from 'antd';
import styles from './Orgnaztions.less';

const TreeNode = Tree.TreeNode;

const data = {
  orgs: [
    {
      name: '集团领导',
      total: 5,
      online: 1,
      members: [
        {
          name: '陈武'
        },
        {
          name: '吴建军'
        },
        {
          name: '吴建军'
        }
      ]
    },
    {
      name: '经纬测绘信息有限公司',
      total: 27,
      online: 2,
      members: [
        {
          name: '吴建军'
        },
        {
          name: '饶强'
        },
        {
          name: '高宇婷'
        },
        {
          name: '鲁东'
        }
      ]
    },
    {
      name: '六一八信息技术有限公司',
      total: 5,
      online: 0,
      members: [
        {
          name: '王文伟'
        },
        {
          name: '林巍'
        },
        {
          name: '吴良堤'
        }

      ]
    }
  ]
};

const getTree = () => {
  data.orgs.map((org) => {

  });
};

// 主面板列表项
export default () => (
  <Tree
    className={styles.BuddyItem}
  >
    <TreeNode title={'集团领导'} key="0-0">
      <TreeNode title="parent 1-0" key="0-0-0">
        <TreeNode title="leaf" key="0-0-0-0" />
        <TreeNode title="leaf" key="0-0-0-1" />
      </TreeNode>
      <TreeNode title="parent 1-1" key="0-0-1">
        <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
      </TreeNode>
    </TreeNode>
  </Tree>
);
