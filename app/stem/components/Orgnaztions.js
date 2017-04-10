import React from 'react';
import { Tree } from 'antd';
import styles from './Orgnaztions.less';
import dummyImage from '../../utils/dummyimage';

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
          id: '2-3',
          name: '吴良堤'
        }

      ]
    }
  ]
};

// 递归函数生成树
const getTreeNodes = (node) => {
  // 含有子组织
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
  // 没有子组织，下面只有具体成员
  if (node.members) {
    return (
      <TreeNode
        className={styles.BuddyItem}
        title={`${node.name} ${node.online}/${node.total}`}
        key={node.id}
      >
        {node.members.map(getTreeNodes)}
      </TreeNode>
    );
  }

  // 渲染成员
  return (
    <TreeNode
      title={
        <div className={styles.MemberItem}>
          <img src={dummyImage(node.name.slice(0, 1))} alt={node.name} />
          <div className={styles.NameBox}>{node.name}</div>
        </div>
      }
      key={node.id}
    />
  );
};

// 主面板列表项
export default () => (
  <Tree
    className={styles.TreeNode}
  >
    {data.orgs.map(org => getTreeNodes(org))}
  </Tree>
);
