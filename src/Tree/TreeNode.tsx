/**
 * @description Tree
 */
import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { ContextMenuTrigger } from 'react-contextmenu';

import utils from '../lib/utils';

const Item = styled.li`
  padding: 4px 0 4px 15px;
`;

const Title = styled.div`
  cursor: pointer;
  &:hover {
    color: #1abc9c;
  }
  &.active {
    color: #1abc9c;
    border-right: 2px solid #000;
  }
`;

const Method = styled.span`
  font-size: 9px;
  color: #ccc;
  font-weight: light;
`;

const Name = styled.span`
  font-size: 14px;
`;

const Leaf = styled.ul``;

const IconToggle = styled(Icon)`
  font-size: 10px;
  margin-right: 8px;
`;

const IconFile = styled(Icon)`
  font-size: 12px;
  margin-right: 8px;
`;

class TreeNode extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  highlightItem = (node, event) => {
    const $titleNodes = document.querySelectorAll('.leaf-tree-node');
    const nodeArray = Array.prototype.slice.call($titleNodes);

    if (node.type === 'file') {
      // 移除全部高亮
      nodeArray.forEach(dom => {
        utils.removeClass(dom, 'active');
      });

      // 高亮当前dom
      utils.addClass(event.currentTarget, 'active');
    }
  };

  toggle = (node, event) => {
    this.props.onSelect(node);
    const { isRoot } = node;
    if (isRoot) {
      this.setState({ visible: this.state.visible });
    } else {
      this.setState({ visible: !this.state.visible });
    }
    this.highlightItem(node, event);
  };

  render() {
    let treeNodes;
    const { node, onSelect = {} } = this.props;
    const { slug, type, title, method = '', url, isRoot } = node;
    const tips = type === 'file' ? `${method}: ${url}` : '';
    const { visible } = this.state;
    const style = { display: visible || isRoot ? 'block' : 'none' };

    if (node.children != null) {
      treeNodes = node.children.map(node => (
        <TreeNode key={node.key} onSelect={onSelect} node={node} />
      ));
    }

    return (
      <Item title={tips}>
        <ContextMenuTrigger id="leaf-api-menu" collect={() => collect(node)}>
          <Title
            id={slug}
            className="leaf-tree-node"
            onClick={event => this.toggle(node, event)}
          >
            {renderToggle(type, this.state.visible)}
            {renderIcon(type)}
            <Name>{title}</Name>
            {method && <Method>.{method.toLowerCase()}</Method>}
          </Title>
        </ContextMenuTrigger>
        <Leaf style={style}>{treeNodes}</Leaf>
      </Item>
    );
  }
}

export default TreeNode;

// ////////////////////////////////

function renderIcon(type) {
  return type === 'file' ? (
    <IconFile type="file-text" />
  ) : (
    <IconFile type="folder" />
  );
}

function renderToggle(type, visible) {
  if (type === 'file') return null;
  return visible ? <IconToggle type="down" /> : <IconToggle type="right" />;
}

function collect(node) {
  return { node };
}
