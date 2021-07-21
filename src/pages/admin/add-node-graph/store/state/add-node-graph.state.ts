import {INode} from "../../../../../shared/models/node.model";

export type NodesState = {
    nodeLabel: string
    nodeLabels: Array<string>
    nodes: Array<INode>
    node: string
    openNode: boolean
    openNodeLabel: boolean
    addSuccess: boolean
};

export const initialNodesState: NodesState = {
    nodeLabel: "",
    nodeLabels: [],
    nodes: [],
    node: '',
    openNode: false,
    openNodeLabel: false,
    addSuccess: false
};
