import {IGraphNode} from "../../../../../shared/models/graph-node.model";

export type NodesState = {
    nodeLabel: string
    nodeLabels: Array<string>
    nodes: Array<IGraphNode>
    node: IGraphNode
    openNode: boolean
    openNodeLabel: boolean
    deleteSuccess: boolean
};

export const initialNodesState: NodesState = {
    nodeLabel: "",
    nodeLabels: [],
    nodes: [],
    node: null,
    openNode: false,
    openNodeLabel: false,
    deleteSuccess: false
};
