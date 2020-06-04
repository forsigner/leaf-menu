import React from 'react';
declare class ApiList extends React.Component {
    state: {
        q: string;
    };
    highlightItem: (event: any) => void;
    onSelect: ({ node, event, onSelect }: any) => void;
    onKeyUp: (e: any) => void;
    renderBody: (context: any) => JSX.Element;
    render(): JSX.Element;
}
export default ApiList;
