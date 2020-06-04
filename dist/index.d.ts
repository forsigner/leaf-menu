import { Component } from 'react';
interface Props {
    apis?: any;
    name?: 'DEFAULT_NAME' | string;
    onSelect?: () => void;
    onCreate?: () => void;
    onDelete?: () => void;
    onUpdate?: () => void;
    tabBarExtraContent?: null;
}
declare class LeafMenu extends Component<Props> {
    static defaultProps: {
        apis: any[];
        name: string;
        onCreate: any;
        onDelete: any;
        onSelect: any;
        onUpdate: any;
        tabBarExtraContent: any;
    };
    render(): JSX.Element;
}
export default LeafMenu;
