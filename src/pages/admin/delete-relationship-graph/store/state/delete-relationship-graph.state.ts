import {IGraphRelationship} from "../../../../../shared/models/graph-relationship.model";

export type RelationsState = {
    relationship: IGraphRelationship
    relationships: Array<IGraphRelationship>
    openRelationship: boolean
    deleteSuccess: boolean
};

export const initialRelationsState: RelationsState = {
    relationship: null,
    relationships: [],
    openRelationship: false,
    deleteSuccess: false
};
