import { Tabs } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import List from './ApiList';
import GlobalStore from './GlobalStore';
import Tree from './Tree/Tree';

const TabPane = Tabs.TabPane;

const Wrapper = styled.div`
  .ant-tabs-bar {
    margin-bottom: 2px !important;
  }
  .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 10px;
  }
`;

interface Props {
  apis?: any;
  name?: 'DEFAULT_NAME' | string;
  onSelect?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
  tabBarExtraContent?: null;
}

class LeafMenu extends Component<Props> {
  public static defaultProps = {
    apis: [],
    name: 'demo1',
    onCreate: null,
    onDelete: null,
    onSelect: null,
    onUpdate: null,
    tabBarExtraContent: null,
  };

  public render() {
    const { name, tabBarExtraContent } = this.props;

    if (!name) {
      return null;
    }
    return (
      <GlobalStore.Provider value={{ ...this.props }}>
        <Wrapper>
          <Tabs tabBarExtraContent={tabBarExtraContent}>
            <TabPane tab="树形" key="1">
              <Tree />
            </TabPane>
            <TabPane tab="列表" key="2">
              <List />
            </TabPane>
          </Tabs>
        </Wrapper>
      </GlobalStore.Provider>
    );
  }
}

export default LeafMenu;
