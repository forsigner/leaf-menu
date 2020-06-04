/**
 * @description Tree
 */
import React from 'react';
declare class TreeNode extends React.Component<any, any> {
    constructor(props: any);
    highlightItem: (node: any, event: any) => void;
    toggle: (node: any, event: any) => void;
    render(): JSX.Element;
}
export default TreeNode;
