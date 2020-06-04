/**
 * @description Tree Node
 */
import React from 'react';

import { ContextMenu, MenuItem } from 'react-contextmenu';
import styled from 'styled-components';

import GlobalStore from '../GlobalStore';
import TreeNode from './TreeNode';
import tree from '../lib/tree';

const Wrapper = styled.div`
  .leaf-api-menu {
    cursor: pointer;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    .react-contextmenu-item {
      padding: 10px 20px;
    }
  }
`;

class Tree extends React.Component {
  create = ({ data, context }) => {
    if (context.onCreate) {
      context.onCreate(data.node);
    }
  };

  delete = ({ data, context }) => {
    if (context.onDelete) {
      context.onDelete(data.node);
    }
  };

  renderBody = context => {
    const { apis, name, onSelect } = context;
    const data = tree(apis, name) || {};
    return (
      <Wrapper>
        <ContextMenu className="leaf-api-menu" id="leaf-api-menu">
          <MenuItem
            data={{ action: 'create' }}
            onClick={data => this.create({ data, context })}
          >
            新建接口
          </MenuItem>
          <MenuItem
            data={{ action: 'delete' }}
            onClick={data => this.delete({ data, context })}
          >
            删除
          </MenuItem>
          {/* <MenuItem data={{ action: 'update' }} onClick={this.handleClick}>
            修改
          </MenuItem> */}
        </ContextMenu>
        <ul>
          <TreeNode onSelect={onSelect as any} node={data} />
        </ul>
      </Wrapper>
    );
  };

  render() {
    return (
      <GlobalStore.Consumer>
        {context => this.renderBody(context)}
      </GlobalStore.Consumer>
    );
  }
}

export default Tree;
