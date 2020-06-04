import { Input, Icon, Tabs } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import _ from 'lodash-es';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var GlobalStore = /*#__PURE__*/React.createContext({});

var utils = {
  addClass: addClass,
  removeClass: removeClass
};

function addClass(element, className) {
  if (!element) return;
  var classes = element.className.split(' ');

  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }

  element.className = classes.join(' ');
  return element;
}

function removeClass(element, className) {
  if (!element) return;
  var classes = element.className.split(' ');
  var index = classes.indexOf(className);

  if (index > -1) {
    classes.splice(index, 1);
  }

  element.className = classes.join(' ');
  return element;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 12px;\n  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,\n    monospace;\n  width: 188px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n  overflow: hidden;\n  display: inline-block;\n  width: 40px;\n  font-size: 10px;\n  font-weight: lighter;\n  text-transform: lowercase;\n  &.GET {\n    color: #1abc9c;\n  }\n  &.POST {\n    color: #f39c12;\n  }\n  &.PUT {\n    color: #9b59b6;\n  }\n  &.DELETE {\n    color: #e74c3c;\n  }\n  &.PATCH {\n    color: #3498db;\n  }\n  &.OPTION {\n    color: #2ecc71;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  padding: 8px 16px;\n  color: #999;\n  &.active,\n  &:hover {\n    color: #333;\n    background: #f8f8f8;\n    cursor: pointer;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  padding: 8px 16px;\n  font-size: 14px;\n  > i {\n    padding-right: 6px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  margin-bottom: 10px;\n  &.ant-input-affix-wrapper {\n    padding: 2px 10px;\n    .ant-input-suffix {\n      right: 20px !important;\n    }\n  }\n  .ant-input {\n    border-radius: 20px;\n    border: 0;\n    background: #f5f5f5;\n    &:focus {\n      background: #f0f0f0;\n      box-shadow: none;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject());
var Search = /*#__PURE__*/styled(Input.Search)( /*#__PURE__*/_templateObject2());
var Title = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject3());
var List = /*#__PURE__*/styled.ul( /*#__PURE__*/_templateObject4());
var Item = /*#__PURE__*/styled.li( /*#__PURE__*/_templateObject5());
var Method = /*#__PURE__*/styled.span( /*#__PURE__*/_templateObject6());
var Url = /*#__PURE__*/styled.span( /*#__PURE__*/_templateObject7());

var ApiList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ApiList, _React$Component);

  function ApiList() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      q: ''
    };

    _this.highlightItem = function (event) {
      var $nodes = document.querySelectorAll('.leaf-list-node');
      var nodeArray = Array.prototype.slice.call($nodes); // 移除全部高亮

      nodeArray.forEach(function (dom) {
        utils.removeClass(dom, 'active');
      }); // 高亮当前dom

      utils.addClass(event.currentTarget, 'active');
    };

    _this.onSelect = function (_ref) {
      var node = _ref.node,
          event = _ref.event,
          onSelect = _ref.onSelect;

      _this.highlightItem(event);

      onSelect(node);
    };

    _this.onKeyUp = function (e) {
      _this.setState({
        q: e.target.value
      });
    };

    _this.renderBody = function (context) {
      var apis = context.apis,
          name = context.name,
          onSelect = context.onSelect;
      var filteredApis = apis.filter(function (item) {
        var q = _this.state.q;
        if (q === '') return true;
        return item.path.indexOf(q) > -1;
      });
      return React.createElement(Wrapper, null, React.createElement(Title, null, name), React.createElement(Search, {
        placeholder: "\u641C\u7D22\u63A5\u53E3",
        onKeyUp: _this.onKeyUp
      }), React.createElement(List, null, filteredApis.map(function (api) {
        return React.createElement(Item, {
          key: api.slug,
          id: api.slug,
          onClick: function onClick(event) {
            return _this.onSelect({
              node: api,
              event: event,
              onSelect: onSelect
            });
          },
          className: "leaf-list-node"
        }, React.createElement(Method, {
          className: api.method
        }, api.method), React.createElement(Url, null, api.path));
      })));
    };

    return _this;
  }

  var _proto = ApiList.prototype;

  _proto.render = function render() {
    var _this2 = this;

    return React.createElement(GlobalStore.Consumer, null, function (context) {
      return _this2.renderBody(context);
    });
  };

  return ApiList;
}(React.Component);

function _templateObject7$1() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 12px;\n  margin-right: 8px;\n"]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 10px;\n  margin-right: 8px;\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 14px;\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 9px;\n  color: #ccc;\n  font-weight: light;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n  cursor: pointer;\n  &:hover {\n    color: #1abc9c;\n  }\n  &.active {\n    color: #1abc9c;\n    border-right: 2px solid #000;\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  padding: 4px 0 4px 15px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Item$1 = /*#__PURE__*/styled.li( /*#__PURE__*/_templateObject$1());
var Title$1 = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject2$1());
var Method$1 = /*#__PURE__*/styled.span( /*#__PURE__*/_templateObject3$1());
var Name = /*#__PURE__*/styled.span( /*#__PURE__*/_templateObject4$1());
var Leaf = /*#__PURE__*/styled.ul( /*#__PURE__*/_templateObject5$1());
var IconToggle = /*#__PURE__*/styled(Icon)( /*#__PURE__*/_templateObject6$1());
var IconFile = /*#__PURE__*/styled(Icon)( /*#__PURE__*/_templateObject7$1());

var TreeNode = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.highlightItem = function (node, event) {
      var $titleNodes = document.querySelectorAll('.leaf-tree-node');
      var nodeArray = Array.prototype.slice.call($titleNodes);

      if (node.type === 'file') {
        // 移除全部高亮
        nodeArray.forEach(function (dom) {
          utils.removeClass(dom, 'active');
        }); // 高亮当前dom

        utils.addClass(event.currentTarget, 'active');
      }
    };

    _this.toggle = function (node, event) {
      _this.props.onSelect(node);

      var isRoot = node.isRoot;

      if (isRoot) {
        _this.setState({
          visible: _this.state.visible
        });
      } else {
        _this.setState({
          visible: !_this.state.visible
        });
      }

      _this.highlightItem(node, event);
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var treeNodes;
    var _this$props = this.props,
        node = _this$props.node,
        _this$props$onSelect = _this$props.onSelect,
        onSelect = _this$props$onSelect === void 0 ? {} : _this$props$onSelect;
    var slug = node.slug,
        type = node.type,
        title = node.title,
        _node$method = node.method,
        method = _node$method === void 0 ? '' : _node$method,
        url = node.url,
        isRoot = node.isRoot;
    var tips = type === 'file' ? method + ": " + url : '';
    var visible = this.state.visible;
    var style = {
      display: visible || isRoot ? 'block' : 'none'
    };

    if (node.children != null) {
      treeNodes = node.children.map(function (node) {
        return React.createElement(TreeNode, {
          key: node.key,
          onSelect: onSelect,
          node: node
        });
      });
    }

    return React.createElement(Item$1, {
      title: tips
    }, React.createElement(ContextMenuTrigger, {
      id: "leaf-api-menu",
      collect: function collect() {
        return _collect(node);
      }
    }, React.createElement(Title$1, {
      id: slug,
      className: "leaf-tree-node",
      onClick: function onClick(event) {
        return _this2.toggle(node, event);
      }
    }, renderToggle(type, this.state.visible), renderIcon(type), React.createElement(Name, null, title), method && React.createElement(Method$1, null, ".", method.toLowerCase()))), React.createElement(Leaf, {
      style: style
    }, treeNodes));
  };

  return TreeNode;
}(React.Component);

function renderIcon(type) {
  return type === 'file' ? React.createElement(IconFile, {
    type: "file-text"
  }) : React.createElement(IconFile, {
    type: "folder"
  });
}

function renderToggle(type, visible) {
  if (type === 'file') return null;
  return visible ? React.createElement(IconToggle, {
    type: "down"
  }) : React.createElement(IconToggle, {
    type: "right"
  });
}

function _collect(node) {
  return {
    node: node
  };
}

var DEFAULT_ACTIVITY_NAME = '__apis__';
var NODE_TYPE = {
  DIRECTORY: 'directory',
  FILE: 'file'
};
function tree(apis, projectName) {
  if (!apis || apis.length === 0) {
    return {};
  }

  apis = setUrlArr(apis, projectName);
  var items = setParentId(apis);
  items = uniq(items);

  var d = _.filter(items, function (i) {
    return i.type === 'directory';
  });

  var f = _.filter(items, function (i) {
    return i.type === 'file';
  });

  var nodes = d.concat(sort(f));
  items = nodeToTree(nodes);
  return items;
}

function nodeToTree(nodes) {
  var idToNodeMap = {};
  var roots = null;

  if (!nodes || !nodes.length) {
    return [];
  }

  nodes.forEach(function (item) {
    var filters = nodes.filter(function (i) {
      return item.id === i.parentId;
    });

    if (filters.length > 0 || typeof item.parentId === 'undefined') {
      item.children = [];
    }

    idToNodeMap[item.id] = item;

    if (typeof item.parentId === 'undefined') {
      roots = item;
    } else {
      var parentNode = idToNodeMap[item.parentId];

      if (parentNode.children) {
        parentNode.children.push(item);
      }
    }
  });
  return roots;
}

function setUrlArr(apis, projectName) {
  var rootNode = projectName ? projectName + "'s API" : DEFAULT_ACTIVITY_NAME;
  return _.map(apis, function (item) {
    var urlArr = item.path.split('/');
    urlArr[0] = rootNode;
    return _extends({}, item, {
      urlArr: urlArr
    });
  });
}

function setParentId(apis) {
  var items = [];

  _.forEach(apis, function (i) {
    var l = i.urlArr.length;
    var urlArr = i.urlArr;
    var output;

    _.forEach(urlArr, function (value, index) {
      var isRoot = index === 0;
      var isDirectory = index < l - 1;

      if (isRoot) {
        output = {
          id: "/" + value + "/",
          isRoot: true,
          key: "/" + value + "/",
          name: value,
          title: value,
          // parentId: ROOT_NODE_PARENT_ID,
          type: NODE_TYPE.DIRECTORY
        }; // 文件夹
      } else if (isDirectory) {
        output = {
          title: value,
          name: urlArr[index],
          id: "/" + urlArr.slice(0, index + 1).join('/') + "/",
          key: "/" + urlArr.slice(0, index + 1).join('/') + "/",
          parentId: "/" + urlArr.slice(0, index).join('/') + "/",
          type: NODE_TYPE.DIRECTORY
        }; // 文件
      } else {
        output = {
          title: value,
          name: _.last(urlArr) + "." + i.type + ".md",
          id: "/" + urlArr.slice(0, index + 1).join('/') + i.method + "/",
          key: "/" + urlArr.slice(0, index + 1).join('/') + i.method + "/",
          _id: i._id,
          parentId: "/" + i.urlArr.slice(0, index).join('/') + "/",
          type: NODE_TYPE.FILE,
          path: i.path,
          url: i.url,
          apiId: i._id,
          method: i.method,
          slug: i.slug
        };
      }

      items.push(output);
    });
  });

  return items;
}

function uniq(items) {
  var result = items.map(function (i) {
    return JSON.stringify(i);
  });
  return _.uniq(result).map(function (i) {
    return JSON.parse(i);
  });
}

function sort(nodes) {
  var sortedNodes = nodes.slice(1).sort(function (a, b) {
    if (a.name.charCodeAt(0) > b.name.charCodeAt(0)) {
      return 1;
    }

    if (a.name.charCodeAt(0) < b.name.charCodeAt(0)) {
      return -1;
    }

    return 0;
  });
  return [nodes[0]].concat(sortedNodes);
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  .leaf-api-menu {\n    cursor: pointer;\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);\n    .react-contextmenu-item {\n      padding: 10px 20px;\n    }\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper$1 = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject$2());

var Tree = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Tree, _React$Component);

  function Tree() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;

    _this.create = function (_ref) {
      var data = _ref.data,
          context = _ref.context;

      if (context.onCreate) {
        context.onCreate(data.node);
      }
    };

    _this["delete"] = function (_ref2) {
      var data = _ref2.data,
          context = _ref2.context;

      if (context.onDelete) {
        context.onDelete(data.node);
      }
    };

    _this.renderBody = function (context) {
      var apis = context.apis,
          name = context.name,
          onSelect = context.onSelect;
      var data = tree(apis, name) || {};
      return React.createElement(Wrapper$1, null, React.createElement(ContextMenu, {
        className: "leaf-api-menu",
        id: "leaf-api-menu"
      }, React.createElement(MenuItem, {
        data: {
          action: 'create'
        },
        onClick: function onClick(data) {
          return _this.create({
            data: data,
            context: context
          });
        }
      }, "\u65B0\u5EFA\u63A5\u53E3"), React.createElement(MenuItem, {
        data: {
          action: 'delete'
        },
        onClick: function onClick(data) {
          return _this["delete"]({
            data: data,
            context: context
          });
        }
      }, "\u5220\u9664")), React.createElement("ul", null, React.createElement(TreeNode, {
        onSelect: onSelect,
        node: data
      })));
    };

    return _this;
  }

  var _proto = Tree.prototype;

  _proto.render = function render() {
    var _this2 = this;

    return React.createElement(GlobalStore.Consumer, null, function (context) {
      return _this2.renderBody(context);
    });
  };

  return Tree;
}(React.Component);

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n  .ant-tabs-bar {\n    margin-bottom: 2px !important;\n  }\n  .ant-tabs-nav .ant-tabs-tab {\n    padding: 12px 10px;\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var TabPane = Tabs.TabPane;
var Wrapper$2 = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject$3());

var LeafMenu =
/*#__PURE__*/

/** @class */
function () {
  var LeafMenu = /*#__PURE__*/function (_Component) {
    _inheritsLoose(LeafMenu, _Component);

    function LeafMenu() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = LeafMenu.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          name = _this$props.name,
          tabBarExtraContent = _this$props.tabBarExtraContent;

      if (!name) {
        return null;
      }

      return React.createElement(GlobalStore.Provider, {
        value: _extends({}, this.props)
      }, React.createElement(Wrapper$2, null, React.createElement(Tabs, {
        tabBarExtraContent: tabBarExtraContent
      }, React.createElement(TabPane, {
        tab: "\u6811\u5F62",
        key: "1"
      }, React.createElement(Tree, null)), React.createElement(TabPane, {
        tab: "\u5217\u8868",
        key: "2"
      }, React.createElement(ApiList, null)))));
    };

    return LeafMenu;
  }(Component);

  LeafMenu.defaultProps = {
    apis: [],
    name: 'demo1',
    onCreate: null,
    onDelete: null,
    onSelect: null,
    onUpdate: null,
    tabBarExtraContent: null
  };
  return LeafMenu;
}();

export default LeafMenu;
//# sourceMappingURL=leaf-menu.esm.js.map
