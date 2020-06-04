/**
 * @description Tree Node
 */
import React from 'react';
declare class Tree extends React.Component {
    create: ({ data, context }: {
        data: any;
        context: any;
    }) => void;
    delete: ({ data, context }: {
        data: any;
        context: any;
    }) => void;
    renderBody: (context: any) => JSX.Element;
    render(): JSX.Element;
}
export default Tree;
