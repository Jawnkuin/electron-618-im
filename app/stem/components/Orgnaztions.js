import React from 'react';
import { Tree } from 'antd';
import styles from './Orgnaztions.less';

const TreeNode = Tree.TreeNode;

const data = {
  orgs: [
    {
      id: '0',
      name: '集团领导',
      total: 5,
      online: 1,
      members: [
        {
          id: '0-1',
          name: '陈武0'
        },
        {
          id: '0-2',
          name: '陈武1'
        },
        {
          id: '0-3',
          name: '陈武2'
        }
      ]
    },
    {
      id: '1',
      name: '经纬测绘信息有限公司',
      total: 27,
      online: 2,
      members: [
        {
          id: '1-1',
          name: '吴建军'
        },
        {
          id: '1-2',
          name: '饶强'
        },
        {
          id: '1-3',
          name: '高宇婷'
        },
        {
          id: '1-4',
          name: '鲁东'
        }
      ]
    },
    {
      id: '2',
      name: '六一八信息技术有限公司',
      total: 5,
      online: 0,
      members: [
        {
          id: '2-1',
          name: '王文伟'
        },
        {
          id: '2-2',
          name: '林巍'
        },
        {
          id: '2-1',
          name: '吴良堤'
        }

      ]
    }
  ]
};

const getTreeNodes = (node) => {
  if (node.orgs) {
    return (
      <TreeNode
        title={`${node.name} ${node.online}/${node.total}`}
        key={node.id}
      >
        {node.orgs.map(getTreeNodes)}
      </TreeNode>
    );
  }
  if (node.members) {
    return (
      <TreeNode
        title={`${node.name} ${node.online}/${node.total}`}
        key={node.id}
      >
        {node.members.map(getTreeNodes)}
      </TreeNode>
    );
  }
  return (
    <TreeNode title={node.name} key={node.id} />
  );
};

// 主面板列表项
export default () => (
  <Tree
    className={styles.BuddyItem}
  >
    {data.orgs.map(org => getTreeNodes(org))}
  </Tree>
);
