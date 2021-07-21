import {RelationsState} from "../state";
import {IGraphRelationship} from "../../../../../shared/models/graph-relationship.model";


export type RelationsAction = { type: "setRelationsShips", payload: Array<IGraphRelationship> }
    | { type: "setRelationsShipsFailed" }
    | { type: "setRelationship", payload: IGraphRelationship }
    | { type: "setRelationshipFailed" }
    | { type: "setOpenRelationship", payload: boolean }
    | { type: "setDeleteSuccess", payload: boolean };

export const relations_reducer = (state: RelationsState, action: RelationsAction): RelationsState => {
    switch (action.type) {
        case "setRelationsShips":
            let relationShips = action.payload.sort(function (a, b) {
                let elem1 = a.type;
                let elem2 = b.type;
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
                relationship: null
            };
        case 'setOpenRelationship':
            return {
                ...state,
                openRelationship: action.payload
            };
        case 'setDeleteSuccess':
            return {
                ...state,
                deleteSuccess: action.payload
            };
    }
};
