import {IRelationship} from "../../../../../shared/models/relationship.model";
import {INode} from "../../../../../shared/models/node.model";
import {RelationsState} from "../state";


export type RelationsAction = { type: "setRelationsShips", payload: Array<IRelationship> }
    | { type: "setRelationsShipsFailed" }
    | { type: "setRelationship", payload: string }
    | { type: "setRelationshipFailed" }
    | { type: "setNodeLabel1", payload: string }
    | { type: "setNodeLabel2", payload: string }
    | { type: "setNodeLabels1", payload: Array<string> }
    | { type: "setNodeLabels2", payload: Array<string> }
    | { type: "setNode1", payload: string }
    | { type: "setNodes1", payload: Array<INode> }
    | { type: "setNode2", payload: string }
    | { type: "setNodes2", payload: Array<INode> }
    | { type: "setOpenRelationship", payload: boolean }
    | { type: "setOpenNodeLabel1", payload: boolean }
    | { type: "setOpenNode1", payload: boolean }
    | { type: "setOpenNodeLabel2", payload: boolean }
    | { type: "setOpenNode2", payload: boolean }
    | { type: "setAddSuccess", payload: boolean };

export const relations_reducer = (state: RelationsState, action: RelationsAction): RelationsState => {
    switch (action.type) {
        case "setRelationsShips":
            let relationShips = action.payload.sort(function (a, b) {
                let elem1 = a.name;
                let elem2 = b.name;
                if(elem1 < elem2) return -1;
                else return 1;
            })
            return {
                ...state,
                relationships: relationShips
            };
        case "setRelationsShipsFailed":
            return {
                ...state,
                relationships: []
            }
        case "setRelationship":
            return {
                ...state,
                relationship: action.payload
            };
        case "setRelationshipFailed":
            return {
                ...state,
                relationship: ""
            };
        case 'setNodeLabel1':
            return {
                ...state,
                nodeLabel1: action.payload
            };
        case 'setNodeLabel2':
            return {
                ...state,
                nodeLabel2: action.payload
            };
        case 'setNodeLabels1':
            return {
                ...state,
                nodeLabels1: action.payload.sort()
            };
        case 'setNodeLabels2':
            return {
                ...state,
                nodeLabels2: action.payload.sort()
            };
        case 'setNode1':
            return {
                ...state,
                node1: action.payload
            };
        case 'setNodes1':
            let nodes1 = action.payload.sort(function (a, b) {
                let node1 = a.props.name;
                let node2 = b.props.name;
                if(node1 < node2) return -1;
                else return 1;
            })
            return {
                ...state,
                nodes1: nodes1
            };
        case 'setNode2':
            return {
                ...state,
                node2: action.payload
            };
        case 'setNodes2':
            let nodes2 = action.payload.sort(function (a, b) {
                let node1 = a.props.name;
                let node2 = b.props.name;
                if(node1 < node2) return -1;
                else return 1;
            })
            return {
                ...state,
                nodes2: nodes2
            };
        case 'setOpenRelationship':
            return {
                ...state,
                openRelationship: action.payload
            };
        case 'setOpenNodeLabel1':
            return {
                ...state,
                openNodeLabel1: action.payload
            };
        case 'setOpenNode1':
            return {
                ...state,
                openNode1: action.payload
            };
        case 'setOpenNodeLabel2':
            return {
                ...state,
                openNodeLabel2: action.payload
            };
        case 'setOpenNode2':
            return {
                ...state,
                openNode2: action.payload
            };
        case 'setAddSuccess':
            return {
                ...state,
                addSuccess: action.payload
            };
    }
};
