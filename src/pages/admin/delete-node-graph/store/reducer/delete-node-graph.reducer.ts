import {NodesState} from "../state";
import {IGraphNode} from "../../../../../shared/models/graph-node.model";

export type NodesAction = { type: "loadNodeLabels", payload: Array<string> }
    | { type: "loadNodeLabelsFailed" }
    | { type: "loadNodes", payload: Array<IGraphNode> }
    | { type: "loadNodesFailed" }
    | { type: "setNodeLabel", payload: string }
    | { type: "setNodeLabelFailed" }
    | { type: "setNode", payload: IGraphNode }
    | { type: "setOpenNodeLabel", payload: boolean }
    | { type: "setOpenNode", payload: boolean }
    | { type: "setDeleteSuccess", payload: boolean };

export const nodes_reducer = (state: NodesState, action: NodesAction): NodesState => {
    switch (action.type) {
        case "loadNodeLabels":
            return {
                ...state,
                nodeLabels: action.payload.sort()
            };
        case "loadNodeLabelsFailed":
            return {
                ...state,
                nodeLabels: []
            }
        case 'loadNodes':
            let nodes = action.payload.sort(function (a, b) {
                let node1 = a.properties.name;
                let node2 = b.properties.name;
                if(node1 < node2) return -1;
                else return 1;
            })
            return {
                ...state,
                nodes: nodes
            };
        case 'loadNodesFailed':
            return {
                ...state
            };
        case "setNodeLabel":
            return {
                ...state,
                nodeLabel: action.payload
            };
        case "setNodeLabelFailed":
            return {
                ...state,
                nodeLabel: null
            };
        case 'setNode':
            return {
                ...state,
                node: action.payload
            };
        case 'setOpenNodeLabel':
            return {
                ...state,
                openNodeLabel: action.payload
            };
        case 'setOpenNode':
            return {
                ...state,
                openNode: action.payload
            };
        case 'setDeleteSuccess':
            return {
                ...state,
                deleteSuccess: action.payload
            };
    }
};
