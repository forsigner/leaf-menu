import _ from 'lodash';

const DEFAULT_ACTIVITY_NAME = '__apis__';
const NODE_TYPE = {
  DIRECTORY: 'directory',
  FILE: 'file',
};

export default function tree(apis: any, projectName: string) {
  if (!apis || apis.length === 0) {
    return {};
  }
  apis = setUrlArr(apis, projectName);
  let items: any = setParentId(apis);
  items = uniq(items);

  const d = _.filter(items, (i: any) => i.type === 'directory');
  const f = _.filter(items, (i: any) => i.type === 'file');
  const nodes = d.concat(sort(f));
  items = nodeToTree(nodes);

  return items;
}

function nodeToTree(nodes: any) {
  const idToNodeMap = {};
  let roots = null;

  if (!nodes || !nodes.length) {
    return [];
  }

  nodes.forEach((item: any) => {
    const filters = nodes.filter((i: any) => {
      return item.id === i.parentId;
    });

    if (filters.length > 0 || typeof item.parentId === 'undefined') {
      item.children = [];
    }

    idToNodeMap[item.id] = item;

    if (typeof item.parentId === 'undefined') {
      roots = item;
    } else {
      const parentNode = idToNodeMap[item.parentId];
      if (parentNode.children) {
        parentNode.children.push(item);
      }
    }
  });
  return roots;
}

function setUrlArr(apis: any, projectName: string) {
  const rootNode = projectName ? `${projectName}'s API` : DEFAULT_ACTIVITY_NAME;
  return _.map(apis, item => {
    const urlArr = item.path.split('/');
    urlArr[0] = rootNode;
    return { ...item, urlArr };
  });
}

function setParentId(apis: any) {
  const items: any = [];
  _.forEach(apis, i => {
    const l = i.urlArr.length;
    const urlArr = i.urlArr;
    let output;
    _.forEach(urlArr, (value, index: any) => {
      const isRoot = index === 0;
      const isDirectory = index < l - 1;

      if (isRoot) {
        output = {
          id: `/${value}/`,
          isRoot: true,
          key: `/${value}/`,
          name: value,
          title: value,
          // parentId: ROOT_NODE_PARENT_ID,
          type: NODE_TYPE.DIRECTORY,
        };

        // 文件夹
      } else if (isDirectory) {
        output = {
          title: value,
          name: urlArr[index],
          id: `/${urlArr.slice(0, index + 1).join('/')}/`,
          key: `/${urlArr.slice(0, index + 1).join('/')}/`,
          parentId: `/${urlArr.slice(0, index).join('/')}/`,
          type: NODE_TYPE.DIRECTORY,
        };

        // 文件
      } else {
        output = {
          title: value,
          name: `${_.last(urlArr)}.${i.type}.md`,
          id: `/${urlArr.slice(0, index + 1).join('/')}${i.method}/`,
          key: `/${urlArr.slice(0, index + 1).join('/')}${i.method}/`,
          _id: i._id,
          parentId: `/${i.urlArr.slice(0, index).join('/')}/`,
          type: NODE_TYPE.FILE,
          path: i.path,
          url: i.url,
          apiId: i._id,
          method: i.method,
          slug: i.slug,
        };
      }
      items.push(output);
    });
  });
  return items;
}

function uniq(items: any) {
  const result = items.map((i: any) => JSON.stringify(i));
  return _.uniq(result).map((i: string) => JSON.parse(i));
}

function sort(nodes: any) {
  const sortedNodes = nodes.slice(1).sort((a: any, b: any) => {
    if (a.name.charCodeAt(0) > b.name.charCodeAt(0)) {
      return 1;
    }
    if (a.name.charCodeAt(0) < b.name.charCodeAt(0)) {
      return -1;
    }
    return 0;
  });
  return [nodes[0], ...sortedNodes];
}
