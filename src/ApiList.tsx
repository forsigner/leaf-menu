import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

import GlobalStore from './GlobalStore';
import utils from './lib/utils';

const Wrapper = styled.div``;

const Search = styled(Input.Search)`
  margin-bottom: 10px;
  &.ant-input-affix-wrapper {
    padding: 2px 10px;
    .ant-input-suffix {
      right: 20px !important;
    }
  }
  .ant-input {
    border-radius: 20px;
    border: 0;
    background: #f5f5f5;
    &:focus {
      background: #f0f0f0;
      box-shadow: none;
    }
  }
`;

const Title = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  > i {
    padding-right: 6px;
  }
`;

const List = styled.ul``;

const Item = styled.li`
  padding: 8px 16px;
  color: #999;
  &.active,
  &:hover {
    color: #333;
    background: #f8f8f8;
    cursor: pointer;
  }
`;

const Method = styled.span`
  overflow: hidden;
  display: inline-block;
  width: 40px;
  font-size: 10px;
  font-weight: lighter;
  text-transform: lowercase;
  &.GET {
    color: #1abc9c;
  }
  &.POST {
    color: #f39c12;
  }
  &.PUT {
    color: #9b59b6;
  }
  &.DELETE {
    color: #e74c3c;
  }
  &.PATCH {
    color: #3498db;
  }
  &.OPTION {
    color: #2ecc71;
  }
`;

const Url = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  width: 188px;
`;

class ApiList extends React.Component {
  state = {
    q: '',
  };

  highlightItem = (event: any) => {
    const $nodes = document.querySelectorAll('.leaf-list-node');
    const nodeArray = Array.prototype.slice.call($nodes);
    // 移除全部高亮
    nodeArray.forEach(dom => {
      utils.removeClass(dom, 'active');
    });

    // 高亮当前dom
    utils.addClass(event.currentTarget, 'active');
  };

  onSelect = ({ node, event, onSelect }: any) => {
    this.highlightItem(event);
    onSelect(node);
  };

  onKeyUp = e => {
    this.setState({ q: e.target.value });
  };

  renderBody = context => {
    const { apis, name, onSelect } = context;
    const filteredApis = apis.filter(item => {
      const { q } = this.state;
      if (q === '') return true;
      return item.path.indexOf(q) > -1;
    });

    return (
      <Wrapper>
        <Title>
          {/* <Icon type="api" /> */}
          {name}
        </Title>
        <Search placeholder="搜索接口" onKeyUp={this.onKeyUp} />
        <List>
          {filteredApis.map(api => (
            <Item
              key={api.slug}
              id={api.slug}
              onClick={event => this.onSelect({ node: api, event, onSelect })}
              className="leaf-list-node"
            >
              <Method className={api.method}>{api.method}</Method>
              <Url>{api.path}</Url>
            </Item>
          ))}
        </List>
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

export default ApiList;
