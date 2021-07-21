import {IRelationship} from "../../../../../shared/models/relationship.model";
import {INode} from "../../../../../shared/models/node.model";

export type RelationsState = {
    relationship: string
    relationships: Array<IRelationship>
    nodeLabel1: string
    nodeLabels1: Array<string>
    node1: string
    nodes1: Array<INode>
    nodeLabel2: string
    nodeLabels2: Array<string>
    node2: string
    nodes2: Array<INode>
    openRelationship: boolean
    openNodeLabel1: boolean
    openNode1: boolean
    openNodeLabel2: boolean
    openNode2: boolean
    addSuccess: boolean
};

export const initialRelationsState: RelationsState = {
    relationship: null,
    relationships: [],
    nodeLabel1: "",
    nodeLabels1: Array<string>(),
    node1: "",
    nodes1: Array<INode>(),
    nodeLabel2: "",
    nodeLabels2: Array<string>(),
    node2: "",
    nodes2: Array<INode>(),
    openRelationship: false,
    openNodeLabel1: false,
    openNode1: false,
    openNodeLabel2: false,
    openNode2: false,
    addSuccess: false

};
