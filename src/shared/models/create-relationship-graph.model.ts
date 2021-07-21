import {IRelationship} from "./relationship.model";

export interface ICreateRelationshipGraph {
    relationship: IRelationship,
    firstNodeId: string,
    secondNodeId: string
}
